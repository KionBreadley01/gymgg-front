import { toast } from "react-toastify";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function fetchWithAuth(url: string, options: any) {
    const access = localStorage.getItem("access");
    if (access) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${access}`
        };
    }

    let response = await fetch(`${API_HOST}${url}`, options);

    // Si el token expiró, intenta refrescar
    if (response.status === 401 && localStorage.getItem("refresh")) {
        console.warn("Access token expirado, intentando refrescar...");


        const refresh = localStorage.getItem("refresh");
        const refreshResp = await fetch(`${API_HOST}/api/token/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh }),
        });

        if (refreshResp.ok) {
            const data = await refreshResp.json();
            localStorage.setItem("access", data.access);

            // Reintenta la petición original con el nuevo token
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${data.access}`
            };
            response = await fetch(`${API_HOST}${url}`, options);
        } else {
            // refresh inválido → sesión expirada
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            throw new Error("Sesión expirada, inicia sesión nuevamente.");
        }
    }

    return response;
}




const apiService = {


    post: async function (url: string, data: any): Promise<any> {
        console.log('post  se subira', url, data);
        return new Promise((resolve, reject) => {

            fetchWithAuth(`${url}`,
                {

                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        ...(localStorage.getItem('access') && {
                            'Authorization': `Bearer ${localStorage.getItem('access')}`
                        })
                    }
                }
            ).then(response => response.json())
                .then((json) => {
                    console.log('respuesta de ;', data);
                    resolve(json);
                })
                .catch((error => {
                    reject(error)
                }))

        })
    },

    update: async function (url: string, data: any): Promise<any> {
        console.log('Update Actualiza a', url, data);
        return new Promise((resolve, reject) => {

            fetchWithAuth(`${url}`,
                {

                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        ...(localStorage.getItem('access') && {
                            'Authorization': `Bearer ${localStorage.getItem('access')}`
                        })

                    }
                }
            ).then(response => response.json())
                .then((json) => {
                    console.log('respuesta de ;', data);
                    resolve(json);
                })
                .catch((error => {
                    reject(error)
                }))

        })
    },


    delete: async function (url: string): Promise<any> {
        console.log('Delete de', url);

        return new Promise((resolve, reject) => {
            fetchWithAuth(`${url}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...(localStorage.getItem('access') && {
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