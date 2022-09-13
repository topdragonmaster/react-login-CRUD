import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Section,
  Container,
  Content,
} from "./style"
import { Button, Text, Modal } from '../../components'
import UserTable from './userTable'
import AddUserForm from "./AddForm";
import EditUserForm from "./EditForm";
import { IUser, IBaseUser } from "../../types";

const BASE_URL = 'https://gorest.co.in/public/v2/users'
const BASE_TOKEN = 'Bearer 836133d3e861876ae7c136db96a526547f0a23881d0482618aad67362a4ca638'
console.log(process.env)
function User() {

  console.log( "base", BASE_URL, BASE_TOKEN)
  const initCurrentUser: IUser = { id: null, name: "", email: "", gender: "male", status: "inactive" };
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(initCurrentUser);
  const [editing, setEdit] = useState(false);
  const [isShownAdd, setIsShownAdd] = useState<boolean>(false); // modal show flag
  const [isShownEdit, setIsShownEdit] = useState<boolean>(false); // modal show flag
  const [isShown, setIsShown] = useState<boolean>(false); // modal show flag
  const [message, setMessage] = useState<string>(''); // modal show flag
  

  const onAddUser = async (newUser: IBaseUser) => {
    const id = users.length + 1;
    try {
      const resp = await axios.post(
        BASE_URL,
        { ...newUser },
        { headers: { Authorization: BASE_TOKEN}  }
      )
      console.log(resp)
      setUsers([...users, { ...newUser, id }]);
      setMessage('New user is successfully added')
      setIsShown(true)
    } catch (error) {
      setMessage('Some error has happened. Please make sure to use different email')
      setIsShown(true)
        console.log(`error`, error)
    }
  };

  const onCurrentUser = (user: IUser) => {
    setIsShownEdit(true)
    setEditUser(user);
  };

  const onUpdateUser = async (id: number, newUser: IBaseUser) => {
    try {
      const resp = await axios.patch(
        `${BASE_URL}/${id}`,
        { ...newUser },
        { headers: { Authorization: BASE_TOKEN}  }
      )
      setMessage('User is successfully updated')
      setIsShown(true)
      setUsers(users.map(i => (i.id === id ? resp.data : i)));
    } catch (error) {
        setMessage('Some error has happened.')
        setIsShown(true)
        console.log(`error`, error)
    }
  };

  const onDeleteUser = async (currentUser: IUser) => {
    try {
      const resp = await axios.delete(
        `${BASE_URL}/${currentUser.id}`,
        { headers: { Authorization: BASE_TOKEN} }
      )
      setMessage('User is successfully deleted')
      setIsShown(true)
      setUsers(users.filter(i => i.id !== currentUser.id));
      } catch (error) {
        console.log(`error`, error)
    }
  };

  useEffect(() => {
    const getUsers = async () => {
        try {
          const resp = await axios.get(
            BASE_URL,
            { headers: { Authorization: BASE_TOKEN}  }
          )
          console.log(resp)
          setUsers(resp.data)
        } catch (error) {
          console.log(`error`, error)
        }
    }
    getUsers()
  }, [])

  const toggleAdd = () => setIsShownAdd(!isShownAdd);
  const toggleEdit = () => setIsShownEdit(!isShownEdit);
  const toggle = () => setIsShown(!isShown);
  
  const addContent =  <AddUserForm onAddUser={onAddUser} toggle={toggleAdd} />
  const editContent =
    <EditUserForm
      user={editUser}
      onUpdateUser={onUpdateUser}
      setEdit={setEdit}
      toggle={toggleEdit} 
    />
  
  const messageContent = <React.Fragment>
    <p>{message}</p> 
  </React.Fragment>;

  return (
    <Section>
      {
        users.length === 0
          ? <Text fontSize={40} color="black"> Loading... </Text>
          : <Container>
              <Text color="black" fontSize={30} style={{marginBottom: '10px'}}> Users </Text>
              <Content>
                <UserTable
                  users={users}
                  onEdit={onCurrentUser}
                  onDelete={onDeleteUser}
                />
                <Button onClick={() => setIsShownAdd(true)}>add</Button>
              </Content>
             </Container>
      }
      <Modal isShown={isShownAdd} hide={toggleAdd} headerText="Add User" modalContent={addContent} />
      <Modal isShown={isShownEdit} hide={toggleEdit} headerText="Edit User" modalContent={editContent} />
      <Modal isShown={isShown} hide={toggle} headerText="message" modalContent={messageContent} />
    </Section>
  );
}

export default User;