const prisma = require('../Config/Prisma')

exports.getSubQuetList = async (req, res) =>{
    try {
        //Code
        const result = await prisma.sub_quest_list.findMany()

        res.json(result)

    } catch (err) {
        console.log(err)
        res.status(500).json({message:"Server error!!"})
    }
}