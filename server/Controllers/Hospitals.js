const prisma = require('../Config/Prisma')
const moment = require('moment')

exports.getHospitalOnProv = async (req, res) => {
    try {
        //Code
        const { province } = req.params
        const result = await prisma.hospitals.findMany({
            where:{
                AND:[
                    {provname: province},
                    {
                        OR:[
                            {typename: 'โรงพยาบาลศูนย์'},
                            {typename: 'โรงพยาบาลทั่วไป'},
                            {typename: 'โรงพยาบาลชุมชน'}
                        ]
                    }
                ]
            }
        })

        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error!' })
    }
}