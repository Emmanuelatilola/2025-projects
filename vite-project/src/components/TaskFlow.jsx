import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './TaskFlow.css'

function TaskFlow() {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')
  
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('taskflow-current-user')
    if (!currentUser) {
      navigate('/login')
      return
    }
    
    setUser(JSON.parse(currentUser))
    
    // Load user's tasks
    const userTasks = localStorage.getItem(`taskflow-tasks-${JSON.parse(currentUser).id}`)
    if (userTasks) {
      setTasks(JSON.parse(userTasks))
    }
  }, [navigate])

  const addTask = (e) => {
    e.preventDefault()
    if (!newTask.trim()) return

    const task = {
      id: Date.now().toString(),
      text: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }

    const updatedTasks = [task, ...tasks]
    setTasks(updatedTasks)
    localStorage.setItem(`taskflow-tasks-${user.id}`, JSON.stringify(updatedTasks))
    setNewTask('')
  }

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
    localStorage.setItem(`taskflow-tasks-${user.id}`, JSON.stringify(updatedTasks))
  }

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
    localStorage.setItem(`taskflow-tasks-${user.id}`, JSON.stringify(updatedTasks))
  }

  const logout = () => {
    localStorage.removeItem('taskflow-current-user')
    navigate('/login')
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const completedCount = tasks.filter(task => task.completed).length
  const totalCount = tasks.length
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="taskflow">
      {/* Header */}
      <header className="taskflow-header">
        <div className="header-content">
         
          <div className="logo-section">
           
            <i className="fas fa-tasks"></i>
            <h1>TaskFlow</h1>
          </div>
          
          <div className="user-section">
            
              <div className="welcome-message">

              <i className="fas fa-user-circle"></i>
              <span>Welcome, <strong>{user.name}</strong>!</span>
            </div>
            <button 
              onClick={logout}
              className="logout-btn">
              
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="taskflow-main">
        <div className="dashboard">
          {/* Progress Section */}
          <div className="progress-section">
            <h2>Today's Progress</h2>
            <div className="progress-stats">
              <div className="stat">
                <span className="stat-number">{completedCount}</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">{totalCount - completedCount}</span>
                <span className="stat-label">Remaining</span>
              </div>
              <div className="stat">
                <span className="stat-number">{progressPercentage}%</span>
                <span className="stat-label">Progress</span>
              </div>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Add Task Section */}
          <div className="add-task-section">
            <form onSubmit={addTask} className="add-task-form">
              <div className="input-group">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="What needs to be done?"
                  className="task-input"
                />
                <button type="submit" className="add-btn">
                  <i className="fas fa-plus"></i>
                  Add Task
                </button>
              </div>
            </form>
          </div>

          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({totalCount})
              </button>
              <button 
                className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                onClick={() => setFilter('active')}
              >
                Active ({totalCount - completedCount})
              </button>
              <button 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed ({completedCount})
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div className="tasks-section">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-clipboard-list"></i>
                <h3>No tasks found</h3>
                <p>
                  {filter === 'all' 
                    ? "Start by adding your first task above!" 
                    : `No ${filter} tasks at the moment.`
                  }
                </p>
              </div>
            ) : (
              <div className="tasks-list">
                {filteredTasks.map(task => (
                  <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <div className="task-content">
                      <button 
                        onClick={() => toggleTask(task.id)}
                        className="task-checkbox"
                      >
                        {task.completed && <i className="fas fa-check"></i>}
                      </button>
                      <span className="task-text">{task.text}</span>
                    </div>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="delete-btn"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default TaskFlow
