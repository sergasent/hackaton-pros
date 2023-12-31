import { useSelector } from 'react-redux';
import './ProductPage.scss';
import { ProductCard } from 'ui/ProductCard/ProductCard';
import { ProductList } from 'ui/ProductList/ProductList';
import { productSelector } from 'store/product/productSelectors';
import { Button } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { isMarkable } from './utils/utils';
import { useProductPage } from './hooks/useProductPage';
import { StaticticMarkupType } from 'shared/consts/constants';
import { useProductSwitcher } from './hooks/useProductSwitcher';
import { dealerPriceSelector } from 'store/dealerPrice/dealerPriceSelectors';

export const ProductPage = () => {
  const product = useSelector(productSelector);
  const dealerPrice = useSelector(dealerPriceSelector);
  const {
    isMarkupLoading,
    markupDataSource,
    contextHolder,
    selectedProductVariant,
    isSuccessable,
    handleMarkup,
    handleStatistic,
    handleSelectionChange,
  } = useProductPage({ product });

  const { isBeginOfList, isEndOfList, handlePrevious, handleNext } =
    useProductSwitcher({ product, dealerPrice });

  return (
    <section className="product-page">
      {contextHolder}
      <main className="product-page__main">
        <div className="product-page__block-compare">
          <ProductCard card={product} />
          <ProductList
            listData={markupDataSource}
            selectedItem={selectedProductVariant?.markup.product_id}
            onSelected={handleSelectionChange}
            isLoading={isMarkupLoading}
          />

          <section
            className="markup-controls"
            aria-label="Элементы управления разметкой"
          >
            <div>
              <Button
                className="markup-controls__button"
                icon={<LeftOutlined />}
                style={{ margin: 16, width: 200 }}
                onClick={handlePrevious}
                disabled={isBeginOfList}
              >
                Предыдущий
              </Button>
            </div>
            <div>
              <Button
                className="markup-controls__button markup-controls__button_type_yes"
                type="primary"
                icon={<CheckOutlined />}
                style={{ margin: 16, width: 100 }}
                onClick={() => handleMarkup(StaticticMarkupType.YES)}
                disabled={
                  !isMarkable(product.state) ||
                  selectedProductVariant === undefined ||
                  !isSuccessable
                }
              >
                Да
              </Button>
              <Button
                className="markup-controls__button markup-controls__button_type_no"
                type="primary"
                icon={<CloseOutlined />}
                style={{ margin: 16, width: 100 }}
                onClick={() => handleStatistic(StaticticMarkupType.NO)}
                disabled={!isMarkable(product.state)}
              >
                Нет
              </Button>
              <Button
                style={{ margin: 16, width: 100 }}
                onClick={() => handleStatistic(StaticticMarkupType.DEFFERED)}
                disabled={!isMarkable(product.state)}
              >
                Отложить
              </Button>
            </div>
            <Button
              className="markup-controls__button"
              icon={<RightOutlined />}
              style={{ margin: 16, width: 200 }}
              onClick={handleNext}
              disabled={isEndOfList}
            >
              Следующий
            </Button>
          </section>
        </div>
      </main>
    </section>
  );
};
