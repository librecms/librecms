# librecms-api
To create a new User object in Mongo via RESTful API:

1.  Configure/Set Up MongoDB
2.  Start API server with ``npm start``
3.  Verify that no User objects are listed. Send GET request to /user to list.
* <pre>
$ curl -G "http://localhost:3030/user"
[]
</pre>
4.  Send POST request to /user/create with some form data in JSON format:   
{ "name": "Zach Wolfe", "school": "PSU", "age": 22 }
  * <pre>
$ curl -X POST -H "Content Type: application/json" -d '{ "name": "Zach Wolfe", "school": "PSU", "age": 22 }' "http://localhost:3030/user/create"
{
  "{ \"name\": \"Zach Wolfe\", \"school\": \"PSU\", \"age\": 22 }": "",
    "createdAt": "2013-09-12T00:04:19.660Z",
    "updatedAt": "2013-09-12T00:04:19.660Z",
    "id": "523105039b5e821337000001"
}%     
</pre>
5.  Verify that one User object has been created. Send GET request to /user to list.
  * <pre>
$ curl -G "http://localhost:3030/user"                                                                                                          
[
{
  "{ \"name\": \"Zach Wolfe\", \"school\": \"PSU\", \"age\": 22 }": "",
    "createdAt": "2013-09-12T00:04:19.660Z",
    "updatedAt": "2013-09-12T00:04:19.660Z",
    "id": "523105039b5e821337000001"
}
]
</pre>
