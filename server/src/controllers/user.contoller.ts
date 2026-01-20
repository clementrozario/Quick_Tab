import { Request, Response } from "express";
import { cloudinary } from "../config/cloudinary";
import { User } from "../models/User";

interface AuthRequest extends Request {
    userId?: string
    file ?: Express.Multer.File
}

export const uploadLogo = async (req: AuthRequest, res: Response) => {
    try {
       
        if (!req.file) {
            return res.status(400).json({ error: 'No File Uploaded' });
        }

        if (!req.userId) {
            return res.status(400).json({ error: 'Unauthorized !' });
        }

        const base64 = req.file.buffer.toString('base64')

        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${base64}`,
            {
                folder:'logos'
            }
        )

        const user = await User.findByIdAndUpdate(
            req.userId,
            { logoUrl: result.secure_url },
            { new: true }
        )

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        return res.status(200).json({
            success: true,
            logoUrl:user.logoUrl
        })

    } catch(error) {
        console.error('Upload logo error:', error)
        return res.status(500).json({ error: 'Failed to upload logo' })
    }
}