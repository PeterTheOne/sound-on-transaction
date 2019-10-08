import Web3 from 'web3';
import {BlockHeader} from 'web3-eth';
import './index.html';

const networkRPC = 'ws://ws.tau1.artis.network'; //'wss://ws.sigma1.artis.network';
const address = '0xe8dea11b54CE1aBDbB245D4162359754aA604E5b';
const audio = new Audio('audio_file.mp3');

const web3 = new Web3(networkRPC);

web3.eth.subscribe('newBlockHeaders', null,
  async (error: Error, header: BlockHeader) => {
    if (error) {
      // tslint:disable-next-line:no-console
      console.error(error);
      return;
    }
    const block = await web3.eth.getBlock(header.number, true);
    // console.log('block', header.number, this.network.name);
    if (!block) {
      // todo: wait and retry?
      // for ethereum the block isn't available right after newBlockHeaders..
      // tslint:disable-next-line:no-console
      console.error('no block');
      return;
    }
    block.transactions
        .forEach((t: any) => {
          if (t.to && t.to.toLowerCase() === address.toLowerCase() &&
              t.value !== '0' && t.input === '0x') {
            console.log('play sound');
            document.getElementById('app').classList.add('highlight');
            audio.play();

            setTimeout(() => {
                document.getElementById('app').classList.remove('highlight');
              },
              1000);
            return;
          }
        });
  }
);
