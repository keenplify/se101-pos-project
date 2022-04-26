import dynamic from "next/dynamic";
import { Fragment, useEffect, useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { COMPANY_NAME } from "../../helpers";
import { TransactedVariantsQueries } from "../../queries/transactedvariants";
import { toast } from 'react-toastify';

const QrReader = dynamic(
  () => import("react-qr-reader").then((v) => v.QrReader),
  { ssr: false }
);

export const BarcodeScannerModal = ({
  token,
  cartItems,
  setCartItems,
  transaction,
}) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState("No result");
  const [debounce, setDebounce] = useState(false);
  const handleScan = async (variantId) => {
    setCartItems((_cartItems) => {
      //Check cart
      try {
        for (let index = 0; index < _cartItems.length; index++) {
          const e = _cartItems[index];
          const b = parseInt(e?.variant?.id) === parseInt(variantId);
          if (b) {
            // Return add quantity when variant is found in the cartItem
            e.quantity = e.quantity + 1;
            TransactedVariantsQueries.editQuantityById(
              token,
              e.transactedVariant.id,
              e.quantity
            );
            toast("Scanned " + e.variant.name)
            return [..._cartItems];
          }
        }

        (async () => {
          // If not, create new cartItem.
          const transactedVariant = await TransactedVariantsQueries.add(
            token,
            variantId,
            1,
            transaction.id
          );
          const newCartItem = {
            quantity: 1,
            variant: transactedVariant.data.newTransactedVariant.variant,
            transactedVariant: transactedVariant.data.newTransactedVariant,
          };
          toast("Scanned " + newCartItem.variant.name)
          setCartItems([..._cartItems, newCartItem]);
        })();

        return [..._cartItems];
      } catch (error) {
        return [..._cartItems];
      }
    });
  };

  console.log(debounce)

  useEffect(()=> {
    let interval = setInterval(()=> {
      setDebounce(false)
    }, 3000)
    
    return clearInterval(interval);
  }, [])

  return (
    <Fragment>
      <Button
        variant="secondary"
        onClick={() => setShow(true)}
        className="w-100"
      >
        Barcode Scanner
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Scan Product QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex w-100 align-items-center justify-content-center flex-column">
            <QrReader
              onResult={async (result, error) => {
                if (debounce) return;

                if (!!result) {
                  if (!(result?.text.length > 0)) {
                    return;
                  }

                  const [companyName, variantId, uuid] =
                    result.text.split("-.-");

                  if (companyName !== COMPANY_NAME) {
                    return;
                  }

                  setDebounce(true);
                  handleScan(variantId);
                }
              }}
              scanDelay={3500}
              containerStyle={{ width: "418px" }}
            />
            {data}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
