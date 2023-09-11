class StudentController {
    constructor() {
        $("#studentForm").submit(function(e) {
            e.preventDefault();
        });


        /*$('#btnSave').click(()=>{
            console.log('Pressed')
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "multipart/form-data");

            

            var raw = JSON.stringify({
                "id": "0",
                "name": $('#name').val(),
                "age": $('#age').val(),
                "phone": $('#phone').val(),
                "guardianName": $('#guardianName').val(),
                "address": $('#address').val(),
                "guardianPhone": $('#gphone').val()
            });
            var formData = new FormData($('#studentForm')[0]);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formData
            };

            fetch("http://localhost:8080/api/v1/student", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        });*/

        $('#btnSave').click(() => {
            const fileInput = document.querySelector('#imageUpload');
            const formData = new FormData();

            formData.append('imageUpload', fileInput.files[0]);
            formData.append('name', $('#name').val());
            formData.append('age', $('#age').val());
            formData.append('phone', $('#phone').val());
            formData.append('guardianName', $('#guardianName').val());
            formData.append('address', $('#address').val());
            formData.append('guardianPhone', $('#guardianPhone').val());

            console.log(formData)

            var requestOptions = {
                method: 'POST',
                /*headers: myHeaders,*/
                body: formData,
            };

            fetch("http://localhost:8080/api/v1/student", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    ob.getAllStudents();
                })
                .catch(error => console.log('error', error));
        });

    }

    getAllStudents(){
        var requestOptions = {
            method: 'GET',
            /*headers: myHeaders,*/
            /*body: formData,*/
        };

        fetch("http://localhost:8080/api/v1/student", requestOptions)
            .then(response => response.text())
            .then(result => {
                let parse = JSON.parse(result);
                console.log(parse)
                $('#studentData').children('tr').remove();
                $(parse).each(function(index, value){
                    let tr = $(`<tr>
                                        <td style="display: none">${value.id}</td>
                                        <td>${value.name}</td>
                                        <td>${value.age}</td>
                                        <td>${value.address}</td>
                                     </tr>`);
                    $('#studentData').append(tr);
                    console.log(tr)
                    tr.click(()=>{
                        console.log(value.id)
                        ob.setDetails(value.id)
                    })
                })
            })
            .catch(error => console.log('error', error));
    }

    setDetails(id){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/student/"+id, requestOptions)
            .then(response => response.text())
            .then(result => {

                let parse = JSON.parse(result);
                console.log(parse.name);
                $('.student_img img').eq(0).attr('src','data:image/png;base64,'+parse.imageData);
                $('.cover').css('display','flex');
                $('.studentDetails').css('display','flex');
            })
            .catch(error => console.log('error', error));


    }

}
let ob =new StudentController();