

export async function GET(request:any){

    // Handle GET request for /api/hello
    // Retrieve users from the database or any data source
    const users = [
        {id: 1,name: 'Hello'},
        {id: 2,name: 'World'},
        {id: 3,name: ','},
        {id: 4,name: 'This'},
        {id: 5,name: 'is'},
        {id: 6,name: 'Next'},
        {id: 7,name: 'js'},
    ]
    // Send the users as s response
    return new Response(JSON.stringify(users))

}