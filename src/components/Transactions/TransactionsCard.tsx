import * as React from 'react';
import './TransactionsCard.scss';
import { shortenAddress } from '../../utils/shortenAddress';

export interface ITransactionsCardProps {}

export default function TransactionsCard(props: any) {
  return (
    <div className={'card'}>
      <div className="container">
        <span>
          <svg
            className="img"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            version="1.1"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 784.37 1277.39"
          >
            <g id="Layer_x0020_1">
              <metadata id="CorelCorpID_0Corel-Layer"></metadata>
              <g id="_1421394342400">
                <g>
                  <polygon
                    fill="#343434"
                    fillRule="nonzero"
                    points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"
                  ></polygon>
                  <polygon
                    fill="#8C8C8C"
                    fillRule="nonzero"
                    points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"
                  ></polygon>
                  <polygon
                    fill="#3C3C3B"
                    fillRule="nonzero"
                    points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"
                  ></polygon>
                  <polygon
                    fill="#8C8C8C"
                    fillRule="nonzero"
                    points="392.07,1277.38 392.07,956.52 -0,724.89"
                  ></polygon>
                  <polygon
                    fill="#141414"
                    fillRule="nonzero"
                    points="392.07,882.29 784.13,650.54 392.07,472.33"
                  ></polygon>
                  <polygon
                    fill="#393939"
                    fillRule="nonzero"
                    points="0,650.54 392.07,882.29 392.07,472.33"
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
        </span>
      </div>

      <div className="card-header">
        <p>
          From: {props.addressFrom ? shortenAddress(props.addressFrom) : null}
        </p>
        <p>To: {props.addressTo ? shortenAddress(props.addressTo) : null}</p>
        <p>
          Amount: {props.amount} <i className="fab fa-ethereum"></i>
        </p>
        <p>Message: {props.message}</p>
      </div>

      <div className="date-transaction">
        <span>{props.timestamp}</span>
      </div>
    </div>
  );
}
