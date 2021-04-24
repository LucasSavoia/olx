import styled from 'styled-components'

export const Fake = styled.div`
  background-color: #ddd;
  height:${props => props.height || 20}px;
`;

export const PageArea = styled.div`

display:flex;

.box {
  background-color: #fff;
  border-radius:5px;
  box-shadow: 0px 0px 4px #999;
  margin: 20px 0px;
}

.box--padding {
  padding: 10px;
}

.leftSide {
  flex:1;
  margin-right: 20px;

  .box {
    display: flex;
  }

  .adImage {
    width: 320px;
    heigth: 320px;
    margin-right:20px;

    .each-slide img {
      display:flex;
      align-items: center;
      justify-content: center;
      background-size: cover;
      height: 320px
    }
  }
  .adInfo {
    flex:1;

    .adName {
      margin-bottom: 20px;
       h2 {
         margin: 20px 0 0 0;
       }
       small {
         color: #999;
       }
    }
    .adDescription {
      small {
        color: #999;
      }
    }
  }
}

.rightSide {
  width: 250px;

  .price span {
    color : #0000ff;
    display: block;
    font-size:30px;
    font-weight:bold;
  }

  .contactSeller {
    background-color: #0000ff;
    color: #fff;
    height:30px;
    border-radius:5px;
    box-shadow:0 0 4px #999;
    display:flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    margin-bottom: 20px;

    &:hover {
      background-color: #4d4dff;
    }

  }

  .createdBy strong {
    display: block;
  }
  .createdBy small {
    margin-top: 10px;
    display: block;
    color: #999;

  }
}
`;

export const OthersArea = styled.div`
  h2 {
    font-size:20px;
  }
  .list{
    display: flex;
    flex-wrap:wrap;

    .aditem {
      width: 25%;
    }
  }
`;

export const BreadChumb = styled.div`
font-size:13px;
margin-top: 20px;

a{
  display: inline-block;
  margin: 0 5px;
  text-decoration: none;
  color: #000;
}
`;