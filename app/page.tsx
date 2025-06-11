import Header from '@/app/components/Header'
import WelcomeCard from '@/app/components/WelcomeCard'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <Header />
      <WelcomeCard />
    </main>
  )
}