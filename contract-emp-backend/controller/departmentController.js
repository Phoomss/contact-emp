const db = require('../models')

const Department1 = db.department1
const Department2 = db.department2
const Department3 = db.department3

const createDepartment1 = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, department2_id, department3_id } = req.body
    const newDepartment1 = new Department1({ name, department2_id, department3_id })
    const seveDepartment1 = await newDepartment1.save().catch((err) => {
        console.log("Error: ", err);
        res.status(403).json({ error: "Cannot create Department1 at the moment!" })
    })

    if (seveDepartment1) res.status(200).json({ message: "Department1 create successfully" })
}

const createDepartment2 = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { name, department3_id } = req.body
    const newDepartment2 = new Department2({ name, department3_id })
    const seveDepartment2 = await newDepartment2.save().catch((err) => {
        console.log("Error: ", err);
        res.status(403).json({ error: "Cannot create Department2 at the moment!" })
    })

    if (seveDepartment2) res.status(200).json({ message: "Department2 create successfully" })
}

const createDepartment3 = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { name } = req.body
    const newDepartment3 = new Department3({ name })
    const seveDepartment3 = await newDepartment3.save().catch((err) => {
        console.log("Error: ", err);
        res.status(403).json({ error: "Cannot create Department3 at the moment!" })
    })

    if (seveDepartment3) res.status(200).json({ message: "Department3 create successfully" })
}

const getAllDepartments = async (req, res) => {
    if (req.user.role === "admin" || req.user.role === "card") {
        const departments = await Department1.findAll({
            include: [
                { model: Department2, as: "department2" },
                { model: Department3, as: "department3" }
            ]
        });
        res.status(200).json(departments);
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

const getAllDepartmentsWithParams = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { id, name, department2_id, department3_id } = req.query;
    try {

        const whereClause = {};
        if (id) {
            whereClause.id = id;
        }
        if (name) {
            whereClause.name = name;
        }
        if (department2_id) {
            whereClause.department2_id = department2_id;
        }
        if (department3_id) {
            whereClause.department3_id = department3_id;
        }

        const departments = await Department1.findAll({
            where: whereClause,
            include: [
                { model: Department2, as: "department2" },
                { model: Department3, as: "department3" }
            ]
        });
        if (departments.length === 0) {
            return res
                .status(404)
                .json({ message: "No departments found with the given parameters" });
        }

        return res.status(200).send(departments);
    } catch (error) {
        res.status(500).json({ message: "get All Departments not found " })
    }
};

const updateDepartment1 = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const { name, department2_id, department3_id } = req.body;

    try {
        const department1 = await Department1.findByPk(id);
        if (!department1) {
            return res.status(404).json({ error: "Department1 not found" });
        }

        department1.name = name;
        department1.department2_id = department2_id;
        department1.department3_id = department3_id;
        await department1.save();

        res.status(200).json({ message: "Department1 updated successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(403).json({ error: "Cannot update Department1 at the moment" });
    }
};

const updateDepartment2 = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const { name, department3_id } = req.body;

    try {
        const department2 = await Department2.findByPk(id);
        if (!department2) {
            return res.status(404).json({ error: "Department2 not found" });
        }

        department2.name = name;
        department2.department3_id = department3_id;
        await department2.save();

        res.status(200).json({ message: "Department2 updated successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(403).json({ error: "Cannot update Department2 at the moment" });
    }
};

const updateDepartment3 = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const { name } = req.body;

    try {
        const department3 = await Department3.findByPk(id);
        if (!department3) {
            return res.status(404).json({ error: "Department3 not found" });
        }

        department3.name = name;
        await department3.save();

        res.status(200).json({ message: "Department3 updated successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(403).json({ error: "Cannot update Department3 at the moment" });
    }
};

const deleteDepartment1 = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    try {
        const department1 = await Department1.findByPk(id);
        if (!department1) {
            return res.status(404).json({ error: "Department1 not found" });
        }

        await department1.destroy();
        res.status(200).json({ message: "Department1 deleted successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(403).json({ error: "Cannot delete Department1 at the moment" });
    }
};

const deleteDepartment2 = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    try {
        const department2 = await Department2.findByPk(id);
        if (!department2) {
            return res.status(404).json({ error: "Department2 not found" });
        }

        await department2.destroy();
        res.status(200).json({ message: "Department2 deleted successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(403).json({ error: "Cannot delete Department2 at the moment" });
    }
}

const deleteDepartment3 = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    try {
        const department3 = await Department3.findByPk(id);
        if (!department3) {
            return res.status(404).json({ error: "Department3 not found" });
        }

        await department3.destroy();
        res.status(200).json({ message: "Department3 deleted successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(403).json({ error: "Cannot delete Department3 at the moment" });
    }
};

module.exports = {
    createDepartment1,
    createDepartment2,
    createDepartment3,
    getAllDepartments,
    getAllDepartmentsWithParams,
    updateDepartment1,
    updateDepartment2,
    updateDepartment3,
    deleteDepartment1,
    deleteDepartment2,
    deleteDepartment3,
}