import { Response} from "express";
import {Model} from "mongoose";
import {IUserRequest} from "@interfaces/user.request.i";

export interface Ifilter {
    fullMatch?: boolean,
    value?: string,
    values?: string[],
    field: string
}

const crudController = (Model: Model<any>) => {
    const create = async (req: IUserRequest, res: Response) => {
        req.body.userId = req.userId
        const item = await new Model(req.body)

        return item.save().then((data: any) => {
            res.send({status: 'ok', data});
        }).catch((err: Error) => {
            res.status(500).send({message: err});
        })
    }

    const update = async (req: IUserRequest, res:Response) => {
        await Model.findOneAndUpdate(
            {_id: req.params.id, userId: req.userId },
            {$set: req.body},
            {upsert: false, useFindAndModify: false}
        ).then((data) => {
            if (data) {
                res.json({status: 'ok', data: req.body})
            } else {
                res.status(404).json({
                    status: 'fail',
                    message: 'Not found'
                })
            }
        }).catch((err) => {
            res.status(500).send({message: err});
        })
    }

    const remove = async (req: IUserRequest, res: Response) => {
        await Model.deleteOne({_id: req.params.id, userId: req.userId }).then((data) => {
            if (data) {
                res.json({status: 'ok', id: req.params.id})
            } else {
                res.status(404).json({
                    status: 'fail',
                    message: 'Not found'
                })
            }
        })
    }

    const getOne = async (req: IUserRequest, res: Response) => {
        const item = await Model.findOne({_id: req.params.id, userId: req.userId }, {upsert: false, useFindAndModify: false})
        return res.json({status: 'ok', data: item})
    }

    const getAll = async (req: IUserRequest, res: Response) => {

        try {

            let sortModel = {}

            if (req.body.sort?.field) {
                const {sort} = req.body
                sortModel = {
                    [sort.field]: sort.order === 'ascend' ? -1 : 1
                }
            }

            let filterModel: Ifilter = {
                field: ''
            }

            const getOrMatch = (rec: Ifilter) => {
                if (rec?.values) {
                        return {
                            $or: rec.values.map((value) => ({
                                [rec.field]: value
                            }))
                        }
                }

            }

            if (req.body?.filter) {
                const { filter } = req.body

                filterModel = filter.reduce((acc: Ifilter, rec: Ifilter): Ifilter => {
                    if (rec.fullMatch) {
                        return {...acc, ...getOrMatch(rec)}
                    } else {
                        const value = rec.value || ''
                        return {...acc, [rec.field]: {$regex: new RegExp(value, 'i')}}
                    }

                }, {})

                filterModel = Object.assign(filterModel, {
                    userId: req.userId
                })
            }

            let query = Model.find(filterModel).sort(sortModel)

            const page = parseInt(req.body.page) || 1
            const pageSize = parseInt(req.body.limit) || 20
            const skip = (page - 1) * pageSize
            const total = await Model.countDocuments(filterModel)

            const pages = Math.ceil(total / pageSize)

            query = query.skip(skip).limit(pageSize)

            const result = await query

            if (page !== 1 && page > pages) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'No page found'
                })
            }

            return res.status(200).json({
                status: 'success',
                count: result.length,
                page,
                pages,
                total,
                data: result
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'error',
                message: error,
            })
        }
    }

    return {create, update, remove, getOne, getAll}
}

export default crudController
