import styles from './App.module.css'
import ControlPanel from './components/control_panel'
import ProjectPanel from './components/project_panel'

function App() {

  return (
    <main className={styles.panelContainer} style={{
      display: 'flex',
      flexDirection: 'row',
      padding: '20px',
      width: '100%',
      height: '100vh',
    }}>
      <ProjectPanel />
      <ControlPanel />
    </main>
  )
}

export default App
