import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { PageArea } from './styled'
import useApi from '../../helpers/OlxApi'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents'

const Page = () => {

  const api = useApi();

  const fileField = useRef();
  const history = useHistory();

  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [priceNegotiable, setPriceNegotiable] = useState('');
  const [desc, setDesc] = useState('');

  const [disabled, setDisable] = useState(false);
  const [error, setError] = useState('')

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    }
    getCategories();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    setError('');

    let errors = [];

    if (!title.trim()) {
      errors.push('Sem Título');
    }

    if (!category) {
      errors.push('Sem Categoria')
    }

    // DEU CERTO!
    if (errors.length === 0) {
      const fData = new FormData();
      fData.append('title', title);
      fData.append('price', price);
      fData.append('priceneg', priceNegotiable);
      fData.append('desc', desc);
      fData.append('cat', category);

      if (fileField.current.files.length > 0) {
        for (let i = 0; i < fileField.current.files.length; i++) {
          fData.append('img', fileField.current.files[i]);
        }
      }

      const json = await api.addAd(fData);

      if (!json.error) {
        history.push(`/ad/${json.id}`);
        return;
      } else {
        setError(json.error)
      }


    } else {
      setError(errors.join("\n"))
    }

    setDisable(false);

  }

  const priceMask = createNumberMask({
    prefix: 'R$ ',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ','
  })


  return (
    <PageContainer>
      <PageTitle>Postar um anúncio</PageTitle>
      <PageArea>
        {error &&
          <ErrorMessage>{error}</ErrorMessage>
        }

        <form onSubmit={handleSubmit}>

          <label className="area">
            <div className="area-title">Título</div>
            <div className="area-input">
              <input
                type="text"
                disabled={disabled}
                value={title}
                onChange={e => setTitle(e.target.value)}
                required>
              </input>
            </div>
          </label>

          <label className="area">
            <div className="area-title">Categoria</div>
            <div className="area-input">
              <select
                disabled={disabled}
                onChange={e => setCategory(e.target.value)}
                required
              >
                <option></option>
                {categories && categories.map(i =>
                  <option key={i.id} value={i.id}>{i.name}</option>
                )}

              </select>
            </div>
          </label>

          <label className="area">
            <div className="area-title">Preço</div>
            <div className="area-input">
              <MaskedInput
                mask={priceMask}
                placeholder="R$ "
                disabled={disabled || priceNegotiable}
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area-title">Preço Negociável</div>
            <div className="area-input">
              <input
                type="checkbox"
                disabled={disabled}
                checked={priceNegotiable}
                onChange={e => setPriceNegotiable(!priceNegotiable)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area-title">Descrição</div>
            <div className="area-input">
              <textarea
                disabled={disabled}
                value={desc}
                onChange={e => setDesc(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area-title">Imagens</div>
            <div className="area-input">
              <input
                type="file"
                disabled={disabled}
                ref={fileField}
                multiple

              />
            </div>
          </label>

          <label className="area">
            <div className="area-title"></div>
            <div className="area-input">
              <button disabled={disabled}>Adicionar Anúncio</button>
            </div>
          </label>

        </form>
      </PageArea>
    </PageContainer>
  )


}

export default Page;