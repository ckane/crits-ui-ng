import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import 'react-table/react-table.css';
import {crits_uri} from './config.js';

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
    }
  }
  return "";
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	    username: '',
	    password: ''
    };
    this.CRITsLogin = this.CRITsLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };
  handleChange(e) {
	  var cur_state = {};
	  cur_state[e.target.getAttribute("name")] = e.target.value;
	  this.setState(cur_state);
  };
  CRITsLoginToken() {
    var n = new XMLHttpRequest();
    n.open("GET", crits_uri + "login/", true);
    n.withCredentials = true;
    n.onload = function (e) {
	         if(n.readyState === 4) {
		   if(n.status === 200) {
		     var ct = getCookie('csrftoken');
	             var xhr2 = new XMLHttpRequest();
	             xhr2.open("POST", crits_uri + "login/", true);
                     xhr2.withCredentials = true;
                     xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
                     xhr2.setRequestHeader("X-CSRFToken", ct);
                     xhr2.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		     xhr2.onload = this.CRITsLoginLoad.bind(this, xhr2);
		     xhr2.onerror = this.CRITsLoginError.bind(this, xhr2);
		     xhr2.send('username=' + encodeURIComponent(this.state.username) +
			       '&password=' + encodeURIComponent(this.state.password) +
			       '&next_url=' + encodeURIComponent(''));
		   } else {
                     console.error("Get CSRF Token failure" + n.status);
	           }
	         };
    }.bind(this);
    n.onerror = function (e) {
                 console.error("CSRF Token get ERROR ");
    };
    n.send(null);
  };

  CRITsLoginLoad(xhr, e) {
    if(xhr.readyState === 4) {
      if(xhr.status === 200) {
        var server_msg = JSON.parse(xhr.responseText);
	if(!server_msg.success) {
          console.error("Login failure: \n" + server_msg.message);
	} else {
	  this.props.history.push('/ips');
	}
      } else {
        console.error("Login unsuccessful! " + xhr.statusText);
      };
    };
  };

  CRITsLoginError(xhr, e) {
    console.error("There was an error!");
  };

  CRITsLogin(ev) {
    this.CRITsLoginToken();

    ev.preventDefault();
  };
  render() { return (
    <div>
    <h1>Login</h1>
    <form onSubmit={this.CRITsLogin}>
     <p>
      <b>Username:</b> <input name="username" type="text" width="30" onChange={this.handleChange} /> <br />
      <b>Password:</b> <input name="password" type="password" width="30" onChange={this.handleChange} /> <br />
      <input type="submit" />
     </p>
    </form>
    </div>
    );
  };
};

class IPsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ips: [], loading: false, pages: -1};
  };
  populateData(xhr, pe) {
    if(xhr.readyState === 4) {
      if(xhr.status === 200) {
        var ip_list = JSON.parse(xhr.responseText);

	this.setState({
		'ips': ip_list.objects.map(function (x) { var v = {'status': x['status'], 'ip': x['ip'], 'source': x['source'][0]['name']}; return v; }),
		'pages': Math.ceil(ip_list.total_count / xhr.table_state),
		'loading': false,
	});
      };
    };
  };
  failData(xhr, pe) {
    console.error("Failed to get data! " + xhr.statusText);
  };
  fetchData(state, inst) {
    var xhr = new XMLHttpRequest();
    var query_uri = crits_uri + "api/v1/ips/?";

    // Limit results by page size
    query_uri = query_uri + "limit=" + state.pageSize.toString();

    // Set offset to be first item on current page
    query_uri = query_uri + "&offset=" + (state.pageSize * state.page).toString();

    if(state.sorted.length > 0) {
      query_uri = query_uri + "&sort=";
      query_uri = query_uri + state.sorted.filter(function(y) {
	                                     if(y.id === "source") {
				               return {'id': 'source.name', 'desc': y.desc};
					     }
					     return y;
					   }).map(function (x) {
	                                               if(x.desc) {
				                         return '-' + x.id;
					               }
	                                               return x.id;
	                                 }).join(',')
    }

    xhr.open("GET", query_uri, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.onload = this.populateData.bind(this, xhr);
    xhr.onerror = this.failData.bind(this, xhr);
    xhr.table_state = state;
    xhr.send(null);
  };
  render() {
    var columns = [
      {Header: 'Status', accessor: 'status'},
      {Header: 'IP', accessor: 'ip'},
      {Header: 'Source', accessor: 'source'},
    ];
    return (
      <ReactTable
	data={this.state.ips}
	columns={columns}
	loading={this.state.loading}
	manual
	pages={this.state.pages}
	onFetchData={(state, inst) => {
		this.setState({loading: true});
		this.fetchData(state, inst);
	}}
		/>
    );
  };
};

const About = () => (
  <h1>About</h1>
);

const CRITSApp = () => (
  <div>
   <Route path="/login" component={Login} />
   <Route path="/about" component={About} />
   <Route path="/ips" component={IPsView} />
  </div>
);

ReactDOM.render(
  <BrowserRouter>
   <CRITSApp />
  </BrowserRouter>,
  document.getElementById('root')
);
