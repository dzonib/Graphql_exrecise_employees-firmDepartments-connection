const graphql = require('graphql');

const employees = [
  {
    name: 'Lawana Thoms',
    age: 54,
    id: '1',
    firmDepartmentId: '1'
  }, {
    name: 'Ward Ashurst',
    age: 31,
    id: '2',
    firmDepartmentId: '1'
  }, {
    name: 'Sibyl Eldred',
    age: 37,
    id: '3',
    firmDepartmentId: '2'
  }, {
    name: 'Margot Saidi',
    age: 73,
    id: '4',
    firmDepartmentId: '2'
  }, {
    name: 'Zenia Thorn',
    age: 19,
    id: '5',
    firmDepartmentId: '2'
  }, {
    name: 'Dzoni B',
    age: 45,
    id: '6',
    firmDepartmentId: '3'
  }, {
    name: 'Annette Ruffo',
    age: 29,
    id: '7',
    firmDepartmentId: '4'
  }
]

const firmDepartments = [
  {
    departmentName: 'IT',
    id: '2',
    description: 'IT sector is blablabla'
  }, {
    departmentName: 'Human Resources',
    id: '1',
    description: 'Human resources departmen is best branch of our firm'
  }, {
    departmentName: 'Sector of dummies',
    id: '3',
    description: 'best sector eva'
  }, {
    departmentName: 'Boss',
    id: '4',
    description: 'Der boss'
  }
]

const {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList
} = graphql;

const EmployeesType = new GraphQLObjectType({
  name: 'Employees',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    id: {
      type: GraphQLID
    },
    firmDepartmentId: {
      type: GraphQLInt
    },
    department: {
      type: FirmDepartmentType,
      resolve(parent, args) {
        return firmDepartments.find( department => department.id === parent.firmDepartmentId)
      }
    }
  })
})


const FirmDepartmentType = new GraphQLObjectType({
  name: 'FirmDepartments',
  fields: () => ({
    departmentName: {type: GraphQLString},
    id: {type: GraphQLID},
    description: {type: GraphQLString},
    employees: {
      type: new GraphQLList(EmployeesType),
      resolve(parent, args) {
        return employees.filter( employee => employee.id === parent.id)
      }
    }
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    employee: {
      type: EmployeesType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return employees.find(employee => employee.id === args.id)
      }
    },
    firmDepartments: {
      type: FirmDepartmentType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return firmDepartments.find( department => department.id === args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({query: RootQuery})