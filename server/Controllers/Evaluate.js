const prisma = require('../Config/Prisma')


exports.saveEvaluates = async (req, res) => {
    try {
        //Code
        const questValues = req.body.map((item) => ({
            category_questId: item.category_questId,
            questId: item.questId,
            sub_questId: item.sub_questId,
            check: item.check,
            hcode: item.hcode,
            userId: item.userId
        }))

        // console.log('Data: ', questValues)

        await prisma.evaluate.createMany({
            data: questValues
        })
        res.json({ message: `ประเมินผลสำเร็จ!` })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error!' })
    }
}

exports.getListEvaluateByHosp = async (req, res) => {
    try {
        //Code
        const { hcode } = req.params
        // const result = await prisma.evaluate.findMany({
        //     where: { hcode: hcode },
        //     include: {
        //         category_quests: {
        //             select: {
        //                 id: true,
        //                 category_name_th: true,
        //                 category_name_eng: true,
        //                 fiscal_year: true
        //             }
        //         },
        //         quests: {
        //             select: {
        //                 id: true,
        //                 quest_name: true
        //             }
        //         },
        //         sub_quests: {
        //             select: {
        //                 id: true,
        //                 sub_quest_name: true
        //             }
        //         },
        //         approve_ssjs: {
        //             select: {
        //                 id: true,
        //                 ssj_approved: true,
        //                 usersId: true
        //             }
        //         },
        //         approve_zones: {
        //             select: {
        //                 id: true,
        //                 zone_approved: true,
        //                 usersId: true
        //             }
        //         }
        //     }
        // })

        const result = await prisma.$queryRaw`SELECT t1.id,t1.category_questId,t1.questId,t1.sub_questId,t3.sub_quest_name,
                t1.check,t1.hcode,t2.id AS sub_quest_listId,t2.sub_quest_listname,t2.sub_quest_total_point,	
                t2.sub_quest_require_point,t2.description,t2.necessary,t1.createdAt,t1.updatedAt
                FROM Evaluate t1 
                LEFT JOIN Sub_quest_list t2 
                ON t1.sub_questId = t2.sub_questId AND t1.check = t2.choice
                LEFT JOIN Sub_quest AS t3 
                ON t1.sub_questId = t3.id
                WHERE hcode = ${hcode}`

        res.json(result)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error!' })
    }
}


exports.sumEvaluateByHosp = async (req, res) => {
    try {
        //Code
        const { hcode } = req.query

        const result = await prisma.$queryRaw`SELECT t1.category_questId, SUM(t2.total_point) AS total_point, SUM(t2.require_point) AS require_point
                        FROM Sub_quest AS t1 LEFT JOIN (SELECT t1.category_questId, t2.sub_questId, SUM(t2.sub_quest_total_point) AS total_point,
                            SUM(t2.sub_quest_require_point) AS require_point
                        FROM Evaluate AS t1 INNER JOIN Sub_quest_list AS t2 ON t1.sub_questId = t2.sub_questId AND t1.check = t2.choice
                        WHERE t1.hcode = ${hcode} GROUP BY t1.category_questId,	t2.sub_questId) AS t2
                        ON t1.id = t2.sub_questId AND t1.category_questId = t2.category_questId GROUP BY t1.category_questId`

        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error!' })
    }
}


exports.getListEvaluateByProv = async (req, res) => {
    try {
        //Code
        const { province } = req.params
        const result = await prisma.evaluate.findMany({
            where: { check: true },
            select: {
                id: true,
                category_quests: {
                    select: {
                        id: true,
                        category_name_th: true,
                        fiscal_year: true
                    }
                },
                quests: {
                    select: {
                        id: true,
                        quest_name: true
                    }
                },
                sub_quests: {
                    select: {
                        id: true,
                        sub_quest_name: true
                    }
                },
                description: true,
                necessary: true,
                check: true,
                sub_quest_total_point: true,
                sub_quest_require_point: true,
                users: {
                    select: {
                        id: true,
                        firstname_th: true,
                        lastname_th: true
                    }
                },
                hcode: true,
                hospitals: {
                    select: {
                        id: true,
                        hcode: true,
                        hname_th: true,
                        tmbname: true,
                        ampname: true,
                        provname: true,
                        zone: true
                    },
                    where: {
                        provname: province
                    }
                }
            }
        })
        // .$queryRaw`SELECT * FROM Evaluate LEFT JOIN Hospitals 
        // ON Evaluate.hcode = Hospitals.hospital_code WHERE Hospitals.provname = ${province}`

        res.json(result)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error!' })
    }
}


exports.getListEvaluateByZone = async (req, res) => {
    try {
        //Code
        const { zone } = req.params
        const result = await prisma.$queryRaw`SELECT * FROM Evaluate LEFT JOIN Hospitals 
        ON Evaluate.hcode = Hospitals.hospital_code WHERE Hospitals.zone = ${zone}`

        res.json(result)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error!' })
    }
}


exports.refreshEvaluate = async (req, res) => {
    try {
        //Code
        const { category_questId, hcode } = req.query
        console.log(req.query)
        const result = await prisma.evaluate.findMany({
            where: {
                AND: [
                    { category_questId: Number(category_questId) },
                    { hcode: hcode }
                ]
            },
            include: {
                category_quests: {
                    select: {
                        id: true,
                        category_name_th: true,
                        category_name_eng: true,
                        fiscal_year: true
                    }
                },
                quests: {
                    select: {
                        id: true,
                        quest_name: true
                    }
                },
                sub_quests: {
                    select: {
                        id: true,
                        sub_quest_name: true
                    }
                }
            }
        })

        res.json(result)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error!' })
    }
}


exports.getEvaluateById = async (req, res) => {
    try {
        //Code
        const { id } = req.params
        const result = await prisma.evaluate.findFirst({
            where: { id: Number(id) },
            include: {
                category_quests: {
                    select: {
                        id: true,
                        category_name_th: true,
                        category_name_eng: true,
                        fiscal_year: true
                    }
                },
                quests: {
                    select: {
                        id: true,
                        quest_name: true
                    }
                },
                sub_quests: {
                    select: {
                        id: true,
                        sub_quest_name: true
                    }
                }
            }
        })

        res.json(result)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error!' })
    }
}


exports.updatePointEvaluate = async (req, res) => {
    try {
        //Code
        const {
            id,
            description,
            sub_quest_total_point,
            sub_quest_require_point,
            userId
        } = req.body

        await prisma.evaluate.update({
            where: { id: Number(id) },
            data: {
                description,
                sub_quest_total_point,
                sub_quest_require_point,
                userId,
                updatedAt: new Date()
            }
        })

        res.json({ message: `แก้ไขคะแนนสำเร็จ!` })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error!' })
    }
}

exports.truncateTable = async (req, res) => {
    try {
        //Code
        await prisma.evaluate.deleteMany({ where: {} })
        res.status(200).json({
            message: 'Delete all success!'
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error!' })
    }
}

//Save all pdf
exports.saveDocuments = async (req, res) => {
    try {
        //Code
        const data = req.body
        data.file_name = req.file.filename

        console.log(data)

        await prisma.documents.create({
            data: {
                category_questId: Number(data.category_questId),
                hcode: data.hcode,
                usersId: Number(data.usersId),
                file_name: data.file_name
            }
        })

        res.json({ message: `เพิ่มข้อมูลสำเร็จ!` })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'ต้องเป็นไฟล์ PDF เท่านั้น!!' })
    }
}


// Save all pdf
exports.saveEvidenceAll = async (req, res) => {
    try {
        //Code
        const data = req.body
        data.file_name = req.file.filename

        console.log(data)

        await prisma.evidence_all.create({
            data: {
                category_questId: Number(data.category_questId),
                questId: Number(data.questId),
                sub_questId: Number(data.sub_questId),
                hcode: data.hcode,
                usersId: Number(data.usersId),
                file_name: data.file_name
            }
        })

        res.json({ message: `เพิ่มข้อมูลสำเร็จ!` })

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "ต้องเป็นไฟล์นามสกุล .png หรือ .jpg หรือ .pdf เท่านั้น!!" })
    }
}


exports.getDocumentsFromEvaluate = async (req, res) => {
    try {
        //Code
        // const result = await prisma.evidence_document.findMany()
        // res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error!' })
    }
}



exports.getDocumentsByEvaluateByHosp = async (req, res) => {
    try {
        //Code
        const { category_questId, hcode } = req.query

        const result = await prisma.documents.findFirst({
            where: {
                AND: [
                    { category_questId: Number(category_questId) },
                    { hcode: hcode }
                ]
            }
        })

        res.json(result)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error!' })
    }
}

