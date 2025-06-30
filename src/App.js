import Layout from './components/Layout';
import Profile from './pages/Profile';

function App() {
  return (
    <Layout>
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section id="about">
          <Profile />
        </section>
      </main>
    </Layout>
  );
}

export default App;
