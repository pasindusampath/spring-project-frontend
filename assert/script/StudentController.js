class StudentController {
    constructor() {
        $('#btnSave').click(()=>{
            console.log('Pressed')
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "id": "0",
                "name": $('#name').val(),
                "age": $('#age').val(),
                "phone": $('#phone').val(),
                "guardianName": $('#guardianName').val(),
                "address": $('#address').val(),
                "guardianPhone": $('#gphone').val()
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://192.168.8.106:8080/api/v1/student", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        });
    }

}
new StudentController();