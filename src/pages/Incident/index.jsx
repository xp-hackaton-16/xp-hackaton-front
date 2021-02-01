import React, { useEffect, useState } from 'react';
import {
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiButton,
} from '@elastic/eui';
import { DashboardContainer } from '../Dashboard/atoms';

// create data
var initData = {
  nodes: [
    {id: "Richard"},
    {id: "Larry"},
    {id: "Marta"},
    {id: "Jane"},
    {id: "Norma"},
    {id: "Frank"},
    {id: "Brett"},
    {id: "A"}
  ],
  edges: [
    {from: "Richard", to: "Larry"},
    {from: "Richard", to: "Marta"},
    {from: "Larry",   to: "Marta"},
    {from: "Marta",   to: "Jane"},
    {from: "Jane",    to: "Norma"},
    {from: "Jane",    to: "Frank"},
    {from: "Jane",    to: "Brett"},
    {from: "Brett",   to: "Frank"}
  ]
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  console.log(props);
  const [data, setData] = useState(initData)

  useEffect(() => {
    document.getElementById('chart').innerHTML = '';
    window.writechart("chart", data);
  }, [data])

  const handleClick = () => {
    setData({ nodes: [...data.nodes, { id: "B" }], edges: data.edges});
  };

  return (
    <DashboardContainer>
        <EuiPageHeader>
            <EuiPageHeaderSection>
                <EuiTitle size="l">
                    <h1>{props.match.params.id}</h1>
                </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
                <EuiButton>Atualizar</EuiButton>
            </EuiPageHeaderSection>
        </EuiPageHeader>
        <button onClick={handleClick}>click me</button>
        <div id="chart" style={{ height: 400 }}></div>
    </DashboardContainer>
  )
};
