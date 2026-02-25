import noteSchema from "../models/noteSchema.js"


export const addNote = async (req, res) => {
    try {
        const { title, description } = req.body

        const existing = await noteSchema.findOne({
            title: title,
            userId: req.userId
        })

        if (existing) {
            return res.status(401).json({
                success: false,
                message: "Title already exist",
            })
        }

        const data = await noteSchema.create({
            title,
            description,
            userId: req.userId,
        })

        if (!data) {
            return res.status(500).json({
                success: false,
                message: "Note not created",
            })
        }

        return res.status(201).json({
            success: true,
            message: "Note created successfully",
            data,
        })

    } catch (error) {
        console.log("Error in addnote: ", error);

        return res.status(401).json({
            success: false,
            message: "Could not access",
        })
    }
}


export const getAllNotes = async (req, res) => {
    try {
        const data = await noteSchema.find({ userId: req.userId })

        if (!data) {
            return res.status(500).json({
                success: false,
                message: "Note not fetched",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Note fetched successfully",
            data,
        })
    } catch (error) {
        console.log("Error in addnote: ", error);
        return res.status(400).json({
            success: false,
            message: "Note not fetched",
        })
    }
}


export const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id
        const data = await noteSchema.findOneAndDelete({ _id: noteId, userId: req.userId });

        if (data) {
            return res.status(200).json({
                success: true,
                message: "Note deleted successfully",
                data,
            })
        }

        else {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const updateNote = async (req, res) => {
    try {
        const { title, description } = req.body
        const noteId = req.params.id

        const data = await noteSchema.findOne({
            userId: req.userId,
            _id: noteId
        })

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            })
        }

        const existing = await noteSchema.find({
            title: title,
            userId: req.userId,
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Title already exists"
            })
        }

        data.title = title
        data.updatedAt = Date.now()
        await data.save()

        return res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: data,
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Could not update Note",
        });
    }
}