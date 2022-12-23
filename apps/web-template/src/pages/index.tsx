import { useQuery } from '@tanstack/react-query'
import { Link } from 'fsr'
import { Button, Spinner } from 'ui'

function HomePage() {
  const { data, isLoading, isError } = useQuery(["data"], () => (
    fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
  ))

  if (isLoading) return <Spinner />

  if (isError) return <div>Error!</div>

  return (
    <div className="bg-blue-500">
      <h1 className='underline text-3xl text-white'>Home Page</h1>
      <Button />
      <Link to="/about">
        <h2>Go to about page</h2>
      </Link>
    </div>
  )
}

export default HomePage
