const { Role } = require('../models');
const { Op } = require('sequelize');

exports.getAllRoles = async (req, res) => {
  try {
    const { public: isPublic } = req.query; //we retrieve the query param from the url

    const whereCondition = isPublic
      ? { id: { [Op.ne]: 1 } } // Exclude admin
      : {}; // Include all roles

    const roles = await Role.findAll({ where: whereCondition });
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*
[Op.ne] is Sequelize syntax — it's a special operator used to define advanced conditions in where clauses.
In this case, it's used for:

id: { [Op.ne]: 1 }
Which means:
"Get all records where the id is not equal to 1"

Operator	Description	SQL Equivalent
Op.eq	Equal	=
Op.ne	Not equal	!= or <>
Op.gt	Greater than	>
Op.gte	Greater than or equal to	>=
Op.lt	Less than	<
Op.lte	Less than or equal to	<=
Op.in	In array	IN (...)
Op.notIn	Not in array	NOT IN (...)

*/
