import dynamic from "next/dynamic";
import { Fragment, useCallback, useEffect, useState } from "react";
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

  // debounce code from:
  // https://stackoverflow.com/questions/68408715/cancel-previous-requestif-there-are-any-before-making-another-while-using-debo
  // you the man brother
  // even I don't know how these debounce/timeouts/useCallback work
  // ive spent hours debugging this code and this man just came from stack overflow and fucking solved my problem
  // big pee pee move
  const debounce = (fn, timer) => {
    let time;
    return function () {
      let arg = arguments;
      let context = this;
      if (time) clearTimeout(time);
      time = setTimeout(() => {
        fn.apply(context, arg);
        time = null;
      }, timer);
    };
  };

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
            toast("Updated " + e.variant.name + " in the cart.")
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
          toast("Added " + newCartItem.variant.name + " in the cart.")
          setCartItems([..._cartItems, newCartItem]);
        })();

        return [..._cartItems];
      } catch (error) {
        return [..._cartItems];
      }
    });
  };
  const cbHandleScan = useCallback(debounce(handleScan, 2000), []);

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
                if (!!result) {
                  if (!(result?.text.length > 0)) {
                    return;
                  }

                  const [companyName, variantId, uuid] =
                    result.text.split("-.-");

                  if (companyName !== COMPANY_NAME) {
                    return;
                  }

                  cbHandleScan(variantId);
                }
              }}
              scanDelay={1000}
              containerStyle={{ width: "418px" }}
            />
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
