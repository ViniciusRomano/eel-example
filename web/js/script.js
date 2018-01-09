var inicialSettings = {
    init: function () {
        inicialSettings.setTitle();
        inicialSettings.loadUsers();
        inicialSettings.loadButton();
    },
    setTitle: function () {
        eel.set_title()().then(function (value) {
            $("h1").text(value);
        });
    },
    loadUsers: function () {
        eel.get_users()().then(function (users) {
            console.log(users);
            var trHTML = '';
            $.each(users, function (i, user) {
                trHTML += '<tr><td>' + user.email + '</td><td>' + user.password + '</td><td>';
            });
            $('#table-body').empty().append(trHTML);
        })
    },
    loadButton: function () {
        $("#submit-button").on('click', function () {
            eel.save_user($("#exampleInputEmail1").val(), $("#exampleInputPassword1").val())
            inicialSettings.loadUsers();
            return false
        });
        $("#delete-button").on('click', function () {
            eel.drop_database()
            inicialSettings.loadUsers();
            return false
        });
    },
};

$(document).ready(function () {
    inicialSettings.init();
});