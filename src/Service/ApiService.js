import axios from 'axios';

const postCreateNewUser = async (createUser) => {
    // const dataUser = new FormData();
    // dataUser.append('email', email);
    // dataUser.append('name', name);
    return await axios.post('http://localhost:8080/api/users/add', createUser);
};

const getAllUsers = () => {
    return axios.get('http://localhost:8080/api/users');
};

const getfindUsers = (idUser) => {
    return axios.get('http://localhost:8080/api/users/detail/' + idUser);
};

const deleteUser = (idUser) => {
    return axios.delete('http://localhost:8080/api/users/delete/' + idUser);
};

// Hàm API cập nhật người dùng
const updateUser = (idUser, updatedData) => {
    return axios.put('http://localhost:8080/api/users/update/' + idUser, updatedData);
};

export { postCreateNewUser, getAllUsers, getfindUsers, deleteUser, updateUser };
