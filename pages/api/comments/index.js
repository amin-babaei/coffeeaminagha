/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../utils/connectDB';
import Comment from '../../../models/CommentModel';

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getComments(req, res)
            break;
    }
}

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('user', 'userName')
            .populate('productId', 'title')
            .populate({
                path: 'responseTo',
                select: 'user',
                populate: {
                    path: 'user',
                    select: 'userName'
                }
            });
        res.status(200).json({ comments });
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

