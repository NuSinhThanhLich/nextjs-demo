//our-domain/
import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList' 
import Head from 'next/head';


function HomePage (props) {
 // props take from getStaticProps function

//2 render cycle. nextjs render both of it (Lecture 406)

    return (
        <>
          <Head>
            <title>React meetups</title>
            <meta name='description' content='Browse a huge list of highly active React meetups'></meta>
          </Head>
          <MeetupList meetups={props.meetups}></MeetupList>
        </>
    )
}

// export async function getServerSideProps (context) {
//   const res = context.res
//   const req = context.req
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }
//use when the pages need update data more frequently

export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://buitunglam2003:Tunglam2908@cluster0.jsklogf.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db()
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray()
  client.close()

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10
  }
}
// data will take in the build process

export default HomePage