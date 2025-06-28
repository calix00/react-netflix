import React from 'react'
import Banner from '../../components/Banner'
import Row from '../../components/Row'
import requests from '../../api/requests'

export default function MainPage() {
  return (
    <div>
      <Banner />

      <Row title='전 세계 TOP 10' id='TR' fetchUrl={requests.fetchTopRated} />
      <Row title='넷플릭스 오리지널' id='NO'fetchUrl={requests.fetchNetflixOriginals}  />
      <Row title='지금 뜨는 콘텐츠' id='TN' fetchUrl={requests.fetchTrending} />
      <Row title='액션 & 어드벤쳐' id='AM' fetchUrl={requests.fetchActionMovies} />
      <Row title='코미디' id='CM' fetchUrl={requests.fetchComedyMovies} />
      <Row title='공포' id='HM' fetchUrl={requests.fetchHorrorMovies} />
      <Row title='로맨스' id='LM' fetchUrl={requests.fetchRomanceMovies} />
      <Row title='다큐멘터리' id='DM' fetchUrl={requests.fetchDocumentaries} />
      
    </div>
  )
}