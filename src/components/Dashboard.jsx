// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import { createNoting, deleteNoting, updateNoting } from '../graphql/mutations';
import { listNotings } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user,signOut } = useAuthenticator();
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const client = generateClient();
    const history = useNavigate(); 


  useEffect(() => {
    // Kullanıcı bilgijjjlerini almak için Auth.currentUserInfo() kullanın
    const fetchUser = async () => {
      try {
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(()=>{
    if(selectedItem){
      setNewTodo(selectedItem?.name)
      setNewDescription(selectedItem?.description)
    }
  },[selectedItem])

  async function addTodo(name, description) {
    const todo = { name, description,user_id: user.userId};
    const result = await client.graphql({
      query: createNoting,
      variables: {
        input: todo,
      }
    });
    return result
  }

  async function fetchTodos() {
    const todosData = await client.graphql({ query: listNotings,
      variables: {
        filter: {
          user_id: { eq: user.userId } // sadece giriş yapan kullanıcının notlarını filtrele
        }
      } });
    return todosData.data.listNotings.items;
  }

  async function markAsCompleted(todo) {
   if(todo?.user_id === user?.userId){
    const updatedTodo = { 
      id: todo.id, 
      name: newTodo, 
      description: newDescription, 
      user_id: todo.user_id // user_id'yi manuel olarak belirleyin
    };
    //await API.graphql(graphqlOperation(updateTodo, { input: updatedTodo }));
    const result = await client.graphql({
      query: updateNoting,
      variables: {
        input: updatedTodo
      }
    });

    if(result?.data){
      const updatedTodos = todos.map((item) => 
        item.id === result.data.updateNoting.id ? result.data.updateNoting : item
      );

      // Sonuçları state'e yansıtıyoruz
      setTodos(updatedTodos); 
      setSelectedItem(null)
      setNewTodo('');
      setNewDescription('');
      console.log('Todo güncellendi:');
    }else{
      console.log(result?.errors);
    }
   }
  }


  async function removeTodo(todoId) {
    //await API.graphql(graphqlOperation(deleteTodo, { input: { id: todoId } }));
    const result = await client.graphql({
      query: deleteNoting,
      variables: {
        input: { id: todoId }
      }
    });
    if(result?.data){
      const updatedTodos = todos.filter((item) => 
        item.id !== result.data.deleteNoting.id
      );

      // Sonuçları state'e yansıtıyoruz
      setTodos(updatedTodos); 
    }else{
      console.log(result?.errors);
    }
  }

  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    };
    loadTodos();
  }, []);

  const handleAddTodo = async () => {
   const result = await addTodo(newTodo, newDescription);
   if(result?.data){
    setNewTodo('');
    setNewDescription('');
    setTodos([...todos, result?.data?.createNoting]); 
  }else{
    console.log(result?.errors);
  }
   
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <h3>Welcome, {user.username}</h3>
          <p><button className='btn btn-warning' onClick={()=>signOut()} >Çıkış yap</button></p>

          <div>
      <h1>Not Defterim (Yeni Not Ekle)</h1>
      <div className="gap-3 d-flex flex-column">
      <input
        className='form-control'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Başlık"
      />
      <textarea 
      className='form-control'
      onChange={(e)=>setNewDescription(e.target.value)}
      placeholder='Açıklama'
      value={newDescription}
      />
      <button className='btn btn-success' onClick={()=>{selectedItem ? markAsCompleted(selectedItem) : handleAddTodo()}}>{selectedItem ? "Değiştir" : "Ekle"}</button>
      </div>
      
      
      <div className='row mt-4 gap-3'>
        {todos.map((todo) => 
          <div key={todo?.id} className="card col-md-4" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">{todo?.name}</h5>
            <p className="card-text">{todo?.description}</p>
            <a href="#" className="card-link" onClick={() => setSelectedItem(todo)}>Düzenle</a>
            <a href="#" className="card-link" onClick={() => removeTodo(todo?.id)}>Sil</a>
          </div>
        </div>
        )}
      </div>
      
    </div>



        </div>
      ) : (
        <div>
          <p>Lütfen üye girişi yapın.</p>
          <button className='btn btn-success' onClick={()=>history('/login')} >Giriş Yap</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
