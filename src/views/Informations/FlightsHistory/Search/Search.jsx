import React from 'react';
import { extend } from 'lodash';
import {
  SearchkitManager,
  SearchkitProvider,
  SearchBox,
  Hits,
  NoHits,
  InitialLoader,
  HitItemProps,
  Layout,
  TopBar,
  LayoutBody,
  LayoutResults
} from 'searchkit';

import './index.css';
// pasword eslastic search pPzCDPVLDqDoxUWhrmaOMBk8
//https://a26c03016a16e545d3eb04d9e72b4cf6.us-east-1.aws.found.io:9243

const host = 'http://demo.searchkit.co/api/movies';
const searchkit = new SearchkitManager(host, {
  searchOnLoad: false
});

const MovieHitsGridItem = props => {
  const { bemBlocks, result, handleChange } = props;
  const source: any = extend({}, result._source, result.highlight);

  function handleClick(e) {
    e.preventDefault();

    let illnesses = e.target.innerText;
    if (illnesses.length === 0) {
      alert('Enter a illnesses');
    } else {
      handleChange(illnesses, 1);
      //    e.target.value = '';
    }
  }

  return (
    <div className={bemBlocks.item().mix(bemBlocks.container('item'))} data-qa="hit">
      <a href="#" onClick={handleClick}>
        <div
          data-qa="title"
          className={bemBlocks.item('title')}
          dangerouslySetInnerHTML={{ __html: source.title }}
        />
      </a>
    </div>
  );
};

class Search extends React.Component {
  render() {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>
            <SearchBox
              autofocus={true}
              searchOnChange={true}
              prefixQueryFields={['actors^1', 'type^2', 'languages', 'title^10']}
            />
          </TopBar>
          <LayoutBody>
            <LayoutResults>
              <Hits
                mod="sk-hits-grid"
                hitsPerPage={5}
                itemComponent={<MovieHitsGridItem handleChange={this.props.handleChange} />}
                sourceFilter={['title', 'poster', 'imdbId']}
              />
              <NoHits />
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default Search;
