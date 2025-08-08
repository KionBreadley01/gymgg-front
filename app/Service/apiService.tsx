
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
                    ...(localStorage.getItem('access')&& {
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    })
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
},

    update: async function (url:string,  data:any): Promise <any> {
        console.log ('Update Actualiza a', url,data);
        return new Promise ((resolve, reject)=> {
            
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,
            {

                method: 'PUT',
                body:JSON.stringify(data),
                headers:{ 
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    ...(localStorage.getItem('access')&& {
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    })
                    
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
},


delete: async function (url: string): Promise<any> {
    console.log('Delete de', url);

    return new Promise((resolve, reject) => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...(localStorage.getItem('access')&& {
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    })
            },
        })
        .then((response) => {
            if (response.ok) {
                resolve({ success: true });
            } else {
                return response.json().then(errorData => {
                    reject(errorData);
                });
            }
        })
        .catch((error) => {
            reject(error);
        });
    });
}







}





export default apiService;