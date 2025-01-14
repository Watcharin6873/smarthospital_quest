const prisma = require('../Config/Prisma')
const fs = require('fs')
// const baseDir = require('../file-uploads')


exports.saveEvaluates = async (req, res) => {
    try {
        //Code
        const questValues = req.body.map((item) => ({
            category_questId: item.category_questId,
            questId: item.questId,
            sub_questId: item.sub_questId,
            check: String(item.check),
            hcode: item.hcode,
            userId: item.userId
        }))

        // console.log('Data: ', questValues)
        // const check = await prisma.evaluate.findFirst({
        //     where:{
        //         hcode: req.body.map(f=> f.hcode),
        //         sub_questId: req.body.map(f=> f.sub_questId)
        //     }
        // })

        const saveData = await prisma.evaluate.createMany({
            data: questValues
        })
        if (saveData) {
            const log = await prisma.evaluate.findMany({
                where: { createdAt: new Date() },
                select: {
                    id: true,
                    userId: true,
                    hcode: true,
                    hospitals: {
                        select: {
                            id: true,
                            hcode: true,
                            hname_th: true,
                            provname: true,
                            zone: true
                        }
                    }
                }
            })

            const logValue = log.map((item2) => ({
                evaluateId: item2.id,
                usersId: Number(item2.userId),
                hcode: item2.hcode,
                province: item2.hospitals.provname,
                zone: item2.hospitals.zone
            }))

            await prisma.log_evaluate.createMany({
                data: logValue
            })


        }
        res.json({ message: `ประเมินผลสำเร็จ!` })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error!' })
    }
}


exports.saveEvaluates2 = async (req, res) => {
    try {
        //Code
        const data = req.body
        data.file_name = req.file.filename

        console.log('Data: ', data)

        await prisma.evaluate.create({
            data: {
                category_questId: Number(data.category_questId),
                questId: Number(data.questId),
                sub_questId: Number(data.sub_questId),
                check: String(data.check),
                hcode: data.hcode,
                userId: Number(data.userId),
                file_name: data.file_name
            }
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
        //     }
        // })

        const result = await prisma.$queryRaw`SELECT t1.id,t1.category_questId,t1.questId,t1.sub_questId,t3.sub_quest_name,
                t1.check,t1.hcode,t1.file_name,t2.id AS sub_quest_listId,t2.sub_quest_listname,t2.sub_quest_total_point,	
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

exports.getListEvaluateByHosp2 = async (req, res) => {
    try {
        //Code
        const { hcode } = req.params

        const result = await prisma.evaluate.findMany({
            where: { hcode: hcode },
            select: {
                id: true,
                category_questId: true,
                questId: true,
                sub_questId: true,
                sub_quests: {
                    select: {
                        id: true,
                        sub_quest_name: true
                    }
                },
                check: true,
                hcode: true,
                userId: true,
                file_name: true,
                ssj_approve: true,
                zone_approve: true,
                createdAt: true,
                updatedAt: true
            }
        })

        res.json(result)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error!' })
    }
}


exports.getEvaluateByHosp = async (req, res) => {
    try {
        const { questId, hcode } = req.query
        console.log(req.query)
        const result = await prisma.evaluate.findMany({
            where: {
                AND: [
                    { questId: Number(questId) },
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

exports.getListEvaluateAll = async (req, res) => {
    try {
        //Code
        const result = await prisma.evaluate.findMany({
            select: {
                id: true,
                file_name: true,
                ssj_approve: true,
                zone_approve: true,
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
                        sub_quest_name: true,
                        sub_quest_lists: true
                    }
                },
                check: true,
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

exports.getListEvaluateByProv = async (req, res) => {
    try {
        //Code
        const { province } = req.params
        const result = await prisma.evaluate.findMany({
            select: {
                id: true,
                file_name: true,
                ssj_approve: true,
                zone_approve: true,
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
                        sub_quest_name: true,
                        sub_quest_lists: true
                    }
                },
                check: true,
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
                    }
                }
            },
            where: {
                hospitals: {
                    is: {
                        provname: province
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


exports.getListEvaluateByZone = async (req, res) => {
    try {
        //Code
        const { zone } = req.params
        const result = await prisma.evaluate.findMany({
            select: {
                id: true,
                file_name: true,
                ssj_approve: true,
                zone_approve: true,
                category_questId: true,
                category_quests: {
                    select: {
                        id: true,
                        category_name_th: true,
                        fiscal_year: true
                    }
                },
                questId: true,
                quests: {
                    select: {
                        id: true,
                        quest_name: true
                    }
                },
                sub_questId: true,
                sub_quests: {
                    select: {
                        id: true,
                        sub_quest_name: true,
                        sub_quest_lists: true
                    }
                },
                check: true,
                userId: true,
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
                        provcode: true,
                        provname: true,
                        zone: true
                    }
                }
            },
            where: {
                hospitals: {
                    is: {
                        zone: zone
                    }
                }
            }
        })

        // .$queryRaw`SELECT * FROM Evaluate LEFT JOIN Hospitals 
        // ON Evaluate.hcode = Hospitals.hcode JOIN Sub_quest_list ON Evaluate.sub_questId = Sub_quest_list.sub_questId 
        // AND Evaluate.check = Sub_quest_list.choice JOIN Sub_quest ON Evaluate.sub_questId = Sub_quest.id WHERE Hospitals.zone = ${zone}`

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
                        sub_quest_name: true,
                        sub_quest_lists: {
                            select: {
                                id: true,
                                sub_questId: true,
                                sub_quest_listname: true,
                                sub_quest_total_point: true,
                                sub_quest_require_point: true,
                                choice: true
                            }
                        }
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


exports.updateChoiceEvaluate = async (req, res) => {
    try {
        //Code
        const {
            id,
            check,
            userId
        } = req.body

        await prisma.evaluate.update({
            where: { id: Number(id) },
            data: {
                check: String(check),
                userId: userId,
                updatedAt: new Date()
            }
        })

        res.json({ message: `แก้ไขคำตอบสำเร็จ!` })

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


exports.uploadFileById = async (req, res) => {
    try {
        //Code
        const data = req.body
        data.file_name = req.file.filename

        console.log(data)

        const check = await prisma.evaluate.findFirst({
            where: {
                id: Number(req.params.id),
                file_name: {
                    not: null
                }
            }
        })

        if (check) {
            return res.status(400).json({ message: 'มีการเพิ่มไฟล์ในหัวข้อนี้เรียบร้อยแล้ว!' })
        }

        const result = await prisma.evaluate.update({
            where: { id: Number(req.params.id) },
            data: {
                file_name: data.file_name
            }
        })

        // res.json({ message: `เพิ่มข้อมูลสำเร็จ!` })

        res.json({
            message: `เพิ่มข้อมูลสำเร็จ!`,
            data: result
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "ต้องเป็นไฟล์นามสกุล pdf เท่านั้น!!" })
    }
}


exports.removeFileById = async (req, res) => {
    try {
        //Code
        const { id } = req.params
        const find = await prisma.evaluate.findFirst({
            where: {
                id: Number(req.params.id)
            }
        })

        console.log(find)

        fs.unlinkSync(`file-uploads/${find.file_name}`)

        await prisma.evaluate.update({
            where: { id: Number(req.params.id) },
            data: {
                file_name: null
            }
        })

        res.json({ message: 'ลบไฟล์หลักฐานนี้สำเร็จ!!' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error!' })
    }
}


exports.uploadCyberImageFile = async (req, res) => {
    try {
        //Code
        const data = req.body
        data.cyber_image = req.file.filename

        console.log(data)

        await prisma.cyber_level.create({
            data: {
                cyber_level: data.cyber_level,
                cyber_image: data.cyber_image,
                usersId: Number(data.usersId),
                hcode: data.hcode
            }
        })


        res.json({ message: `เพิ่มข้อมูลระดับ Cyber security เรียบร้อย!` })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error!" })
    }
}


exports.getCyberSecurityLevelData = async (req, res) => {
    try {
        //Code
        const { hcode } = req.query
        const result = await prisma.cyber_risk_level.findFirst({
            where: { hcode: hcode }
        })

        res.json(result)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error!' })
    }
}


exports.getEvidenceFromEvaluate = async (req, res) => {
    try {
        // Code
        const { id, hcode } = req.query
        console.log(req.query)
        const result = await prisma.evaluate.findFirst({
            where: {
                AND: [
                    { id: Number(id) },
                    { hcode: hcode }
                ]
            }
        })
        // const result = await prisma.$queryRaw`SELECT t1.id AS evidenceId, t1.category_questId, t1.questId, t1.sub_questId,
        //                     t1.file_name, t1.hcode, t1.usersId, t1.createdAt, t1.updatedAt,	t2.id AS evaluateId
        //                 FROM Evidence_all AS t1 LEFT JOIN Evaluate AS t2
        //                 ON t1.category_questId = t2.category_questId AND t1.questId = t2.questId 
        //                 AND t1.sub_questId = t2.sub_questId AND t1.hcode = t2.hcode
        //                 WHERE t2.id = ${Number(id)} AND t1.hcode = ${hcode}`

        res.json(result)
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


exports.ssjChangeStatusApprove = async (req, res) => {
    try {
        //Code
        const { id, ssj_approve } = req.body
        console.log(req.body)

        await prisma.evaluate.update({
            where: { id: Number(id) },
            data: {
                ssj_approve: ssj_approve,
                updatedAt: new Date()
            }
        })

        res.json({
            message: `Aprove หัวข้อประเมินนี้เรียบร้อย!`
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Sever error!"
        })
    }
}


exports.zoneChangeStatusApprove = async (req, res) => {
    try {
        //Code
        const { id, zone_approve } = req.body
        console.log(req.body)

        await prisma.evaluate.update({
            where: { id: Number(id) },
            data: {
                zone_approve: zone_approve,
                updatedAt: new Date()
            }
        })

        res.json({
            message: `Aprove หัวข้อประเมินนี้เรียบร้อย!`
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Sever error!"
        })
    }
}

exports.splitComma = async (req, res) => {
    try {
        //Code
        const { hcode } = req.query
        const result = await prisma.$queryRaw`SELECT ca.id AS category_questId, res.sub_quest_total_point, res.sub_quest_require_point
                FROM Category_quest ca
                LEFT JOIN (SELECT su.hcode, su.category_questId, SUM(su.sub_quest_total_point) sub_quest_total_point, SUM(su.sub_quest_require_point) sub_quest_require_point
                FROM (SELECT tb1.id AS evaluateId, tb1.category_questId, tb1.questId, tb1.sub_questId, tb1.hcode, tb1.userId, tb1.c_check, tb2.sub_quest_listname,tb2.sub_quest_total_point,
                    tb2.sub_quest_require_point, tb2.description, tb2.necessary
                FROM (SELECT id,category_questId,questId,sub_questId,hcode,userId,SUBSTRING_INDEX(SUBSTRING_INDEX(t.check, ',', n.n), ',', -1) AS c_check
                FROM Evaluate t 
                CROSS JOIN (SELECT a.N + b.N * 10 + 1 n FROM (SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) a ,(SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) b ORDER BY n ) n 
                WHERE n.n <= 1 + (LENGTH(t.check) - LENGTH(REPLACE(t.check, ',', ''))) ORDER BY id,c_check) tb1
                LEFT JOIN Sub_quest_list tb2 ON tb1.sub_questId = tb2.sub_questId AND tb1.c_check = tb2.choice WHERE tb1.hcode=${hcode}) su 
                GROUP BY su.hcode, su.category_questId ORDER BY su.hcode, su.category_questId ASC) res
                ON ca.id = res.category_questId ORDER BY category_questId ASC`

        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Sever error!"
        })
    }
}