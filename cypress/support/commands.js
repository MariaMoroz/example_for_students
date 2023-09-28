
const { _ } = Cypress

Cypress.Commands.add("getActualTable", () => {
    cy.get("#table1 tbody tr").then(($cells) => {
      let table = Cypress._.map($cells, "innerText").map((row) =>
        row.split("\t").filter((el) => el != "edit delete")
      );
      console.log("actualTable", table)
      return table
    })
  })
  
  Cypress.Commands.add("getExpectedSortedTable", (table) => {
    const expectedTable1 = Cypress._.sortBy(table)
    return expectedTable1
  })

Cypress.Commands.add("getRowsArray", () => {
  cy.get("#table1 tbody tr").then(($cells) => {
    let table = Cypress._.map($cells, "innerText").map((row) => row.split("\t").filter(el => el != "edit delete"))

    return table
  })
})

Cypress.Commands.add("getArrayHeaders", () => {
    cy.get("#table1 tr th:not(:last-child)").then(($h) => {
      const headerArray = Array.from($h, h => h.innerText)
    
      return headerArray
    })
  })

Cypress.Commands.add("getArrayObjectsTable", () => {
    let tableObjects = []
    
    cy.getArrayHeaders().then(headersArray => {
        cy.getRowsArray().then(arrayRows => {
            arrayRows.forEach(row => {
                let objectRow = {}
                row.forEach((el, i) => {          
                    if (headersArray[i] == 'Due') {
                        el = el.replace('$', '')
                        objectRow[headersArray[i]] = Number.parseFloat(el)
                    } else {
                        objectRow[headersArray[i]] = el
                    }
                })
                tableObjects.push(objectRow) 
            })
            console.log('tableObjects', tableObjects)
            return tableObjects 
        })              
    })                                       
})

Cypress.Commands.add("sortTable", (table, header) => {
    const expectedTable1 = _.sortBy(table, header)
    
    return expectedTable1
})
