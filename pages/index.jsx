import Header from "../src/components/header/Header";
import Featured from "../src/components/featured/Featured"
import Trending from "../src/components/trending/Trending"
import TopCollectors from "../src/components/collectors/TopCollectors"
import How from "../src/components/how/How"
import Auctions from "../src/components/auctions/Auctions"
import Footer from "../src/components/footer/Footer"

import dataFeatured from "../data/featured.json"
import dataTrending from "../data/trending.json"
import dataUsers from "../data/users.json"
import dataNfts from "../data/nfts.json"

import { useState, useEffect } from "react";


export default function Index() {

  const [featuredCards, setFeaturedCards] = useState([])
  const [trendingCards, setTrendingCards] = useState([])
  const [topCollectors, setTopCollectors] = useState([])
  const [nfts, setNfts] = useState([])

  useEffect(()=>{
    const processedFeatured = dataFeatured.map(card => { return {image: card.source.url}})
    processedFeatured[0] = {...processedFeatured[0], cols:3, rows: 2}
    setFeaturedCards(processedFeatured)
    
    setTrendingCards(dataTrending.map(card => {
      return {
        name: card.name,
        likes:card.likes,
        mediaUrl: card.source.url,
        user:{
          avatarUrl: card.owner.avatar.url,
          verified: card.owner.verified
        },
        price: card.price,
        currency: card.currency
      }
    }));

    setNfts(dataNfts.map(nft => {
      return {
        name: nft.name,
        likes:nft.likes,
        mediaUrl: nft.source.url,
        user:{
          avatarUrl: nft.owner.avatar.url,
        },
        price: nft.price,
        currency: nft.currency,
        timeLeft: Math.abs(Date.parse(nft.auction_end) - Date.now())
      }
    }));

    setTopCollectors(
      dataUsers.map(user => {
        return {
          name: user.username,
          nftsCount: user.nfts.length,
          avatar: user.avatar.url,
          verified: user.verified
        }
      }).sort((f,s)=> f.nftsCount < s.nftsCount).slice(0, 12)
    )
  },[])


  return (
    <div>
      <Header/>
      <Featured items={featuredCards} />
      <Trending cards={trendingCards}/>
      <TopCollectors collectors={topCollectors}/>
      <How 
        title="How it works"
        description="Discover, collect, and sell extraordinary NFTs on the world's first and largest NFT marketplace. There are  three things you'll need in place to open your account and start buying or selling NFTs on BUM."

        items={
          [{
            title: "Digital Currency",
            description:
              "You can get ETH, the digital currency that fuels transactions on the Ethereum blockchain, from a digital currency exchange",
          },
          {
            title: "Crypto Wallet",
            description:
              "A crypto wallet, such as MetaMask, stores your ETH and processes transactions on the Ethereum blockchain.",
          },
          {
            title: "BUM.",
            description:
              "Let's connect your wallet to BUM, edit your profile, and begin interacting in the space.",
          }]
        }
        link="https://app.boom.dev"/>
      <Auctions cards={nfts}/>
      <Footer/>
    </div>
  )
}
