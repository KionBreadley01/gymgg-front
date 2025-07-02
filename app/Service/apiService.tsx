
const apiService={


    post: async function (url:string, data:any): Promise <any> {
        console.log ('post  se subira', url,data);
        return new Promise ((resolve, reject)=> {
            
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,
            {

                method: 'POST',
                body:JSON.stringify(data),
                headers:{ 
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                }
            }
        ).then(response=> response.json())
        .then((json)=>{
             console.log('respuesta de ;', data );
            resolve(json);
        })
        .catch((error =>{
            reject(error)
        }))
        
    })
}
}


export default apiService;