var listCourse = document.getElementById("list-courses");

var courseApi = "https://645320fee9ac46cedf1de16a.mockapi.io/users";

function start() {
    getCourses(generateHtml);
    getInput();
}

start();

// Functions

function postCourse(data, callback) {
    var option = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi, option)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function deleteCourse(id, callback) {
    var option = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    }
    fetch(courseApi + "/" + id, option)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function updateCourse(id, data, callback) {
    var option = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi + "/" + id, option)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}


function getCourses(callback) {
    fetch(courseApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function getCourseByID(id, callback) {
    var option = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    }

    fetch(courseApi + "/" + id, option)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

function generateHtml(courses) {
    var html = courses.map(function(course) {
        return `<li>
            <h3>${course.name}</h3>
            <h4>${course.description}</h4>
        </li>`;
    })
    listCourse.innerHTML = html.join();
}

async function uploadImg(files) {
    var cloud_name = "dcoh5j8ue";
    var uploat_preset = "demo-upload";
    var folderName = "demo";
    var urls = [];
    var imgApi = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    var f = new FormData();
    f.append("upload_preset", uploat_preset);
    f.append("folder", folderName);

    for (var e of files) {
        f.append("file", e);
        var response = await axios.post(imgApi, f, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        urls.push(response.data.secure_url);
    }

    console.log(urls)

    return urls;
}

function getInput() {
    var createBtn = document.getElementById("create");

    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var data = {
            name: name,
            description: description
        };

        postCourse(data, function() {
            getCourses(generateHtml);
        });
    }


    var removeBtn = document.getElementById("id_remove");
    removeBtn.onclick = function() {
        var id = document.querySelector('input[name="id"]').value;
        deleteCourse(id, function() {
            getCourses(generateHtml);
        });
    }

    var updateBtn = document.getElementById("id_update");
    updateBtn.onclick = function() {
        var id = document.querySelector('input[name="id"]').value;
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;

        var data = {
            name: name,
            description: description
        };

        updateCourse(id, data, function() {
            getCourses(generateHtml);
        });
    }


    var addImgBtn = document.getElementById("add_img_btn");

    addImgBtn.onclick = function() {
        var imgAdd = document.querySelector('input[name="add_images"]');
        uploadImg(imgAdd.files);
    }
}