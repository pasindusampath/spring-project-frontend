class StudentController {
    ip='localhost:8080';
    constructor() {
        this.getAllStudents()
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
            if(!this.validate())return;
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

            fetch("http://"+this.ip+"/api/v1/student", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    ob.getAllStudents();
                })
                .catch(error => console.log('error', error));
        });

    }

    validate(){
        console.log(parseInt($('#age').val()))
        console.log('Hello WOrld')
        let result = !$('#name').val() ? false : !$('#age').val() ? false : !$('#phone').val() ? false :
            !$('#guardianName').val() ? false : !$('#address').val() ? false : !$('#gphone').val() ? false : true;
        if (parseInt($('#age').val()) > 21){
            console.log(parseInt($('#age').val()));
            this.popupError('Invalid Age Detected');
            result = false
        }
        if (!((/^([+]94{1,3}|[0])([1-9]{2})([0-9]){7}$/).test($('#phone').val()))) {
            console.log('Hello');
            this.popupError('Invalid Phone Number Detected')
            result = false
        }
        if (!((/^([+]94{1,3}|[0])([1-9]{2})([0-9]){7}$/).test($('#gphone').val()))) {
            console.log('Hello');
            this.popupError('Invalid Phone Number Detected')
            result = false
        }
        return result;
    }

    popupError(text){
        $('.frame').eq(0).css('display', 'block');
        $('.text-message p').eq(0).text(text);
        $('.error-popup').addClass('pop-in');
        $('.error-popup').removeClass('pop-out');
        $('.cover').css('display','flex');
    }

    getAllStudents(){
        var requestOptions = {
            method: 'GET',
            /*headers: myHeaders,*/
            /*body: formData,*/
        };

        fetch("http://"+this.ip+"/api/v1/student", requestOptions)
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
                console.log(result)
                let children = $('.details').children();
                children.eq(0).text(parse.name)
                children.eq(2).text('Age : '+parse.age)
                children.eq(3).text('Phone : '+parse.phone)
                children.eq(4).text('Guardian Name:'+parse.guardianName)
                children.eq(4).text('Guardian Phone:'+parse.guardianPhone)
                children.eq(4).text('Address :'+parse.address)
                //
                console.log(parse.name);
                $('.student_img img').eq(0).attr('src','data:image/png;base64,'+parse.imageData);
                $('.cover').css('display','flex');
                $('.studentDetails').css('display','flex');
            })
            .catch(error => console.log('error', error));


    }

}
let ob =new StudentController();