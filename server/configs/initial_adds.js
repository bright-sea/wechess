
import SampleSgfs from './sample_sgfs';
import MasterSgfs from './master_sgfs';
import SamplePgns from './sample_pgns';
import {Sgfs, Pgns} from '../../lib/collections';

export default function () {
  if (!Sgfs.findOne()) {
    for (let lc = 0; lc < SampleSgfs.length; lc++) {
      const title = SampleSgfs[lc].title;
      const content = SampleSgfs[lc].content;
      const createdAt = new Date();
      Sgfs.insert({title, content, createdAt});
    }
    for (let lc = 0; lc < MasterSgfs.length; lc++) {
      const title = MasterSgfs[lc].title;
      const content = MasterSgfs[lc].content;
      const createdAt = new Date();
      Sgfs.insert({title, content, createdAt});
    }
  }

  if (!Pgns.findOne()) {
    for (let lc = 0; lc < SamplePgns.length; lc++) {
      const title = SamplePgns[lc].title;
      const content = SamplePgns[lc].content;
      const createdAt = new Date();
      Pgns.insert({title, content, createdAt});
    }
  }

}


