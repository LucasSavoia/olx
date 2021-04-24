import React, { useState, useEffect } from 'react';
import { PageArea, SearchArea } from './styled'
import useApi from '../../helpers/OlxApi'
import { Link } from 'react-router-dom'


import { PageContainer } from '../../components/MainComponents'
import AdItem from '../../components/partials/AdItem'

const Page = () => {

  const api = useApi();

  const [stateList, setStateList] = useState([])
  const [categories, setCategories] = useState([])
  const [adList, setAdList] = useState([])

  useEffect(() => {

    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    }

    getStates();

  }, [])

  useEffect(() => {

    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    }

    getCategories();

  }, [])

  useEffect(() => {

    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: 'desc',
        limit: 8
      });
      setAdList(json.ads);
    }
    getRecentAds();
  }, [])



  return (

    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="GET" action="/ads">

              <input type="text" name="q" placeholder="O que você procura?"></input>
              <select name="state">
                {stateList.map((i, k) => (
                  <option key={k} value={i.name}>{i.name}</option>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>

          </div>
          <div className="categoryList">
            {categories.map((i, k) => (
              <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                <img src={i.img} alt="" />
                <span>{i.name}</span>
              </Link>
            ))}

          </div>
        </PageContainer>
      </SearchArea>
      <PageContainer>
        <PageArea>
          <h2>Anúncios Recentes</h2>
          <div className="list">
            {adList.map((i, k) => (
              <AdItem key={k} data={i} />
            ))}
          </div>
          <Link to="/ads" className="seeAllLink">Ver Todos</Link>

          <hr />

          Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado.

        </PageArea>
      </PageContainer>
    </>



  )


}

export default Page;