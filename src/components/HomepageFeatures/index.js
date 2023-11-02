import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from "@docusaurus/Link";

// Keep the first and the 3rd empty to centerize the 2nd.
const FeatureList = [
  {
  },
  {
    title: 'Welcome to ASUS Tinker Board Series Documentation!',
 
    description: (
      <>
        This website is still under construnction. If you don't find the
        information you need here, please go to the <Link to="https://github.com/TinkerBoard/TinkerBoard/wiki">TinkerBoard wiki</Link> for more detail.
      </>
    ),
  },
  {
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
