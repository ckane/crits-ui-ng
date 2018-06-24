import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import 'react-table/react-table.css';
import {crits_uri} from './config.js';
import {collection_tables} from './collection_models.js';

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

class CRITSDataView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dataset: [], loading: false, pages: -1, table_size: 0, page_offset: 0};
  };

  fieldToValue(coll, x) {
    var vobj = {};
    var are_eq = (a, b) => { if(Object.keys(b).indexOf('field_name') >= 0) {
	                       return a === b.field_name;
	                     }
	                     return a === b.accessor;
                           };
    for (var fname in x) {
      if(coll.columns.map((y) => {
	      if(Object.keys(y).indexOf('field_name') >= 0) {
		      return y.field_name;
	      }
	      return y.accessor;}).indexOf(fname) >= 0) {
        var col = coll.columns.filter(are_eq.bind(null, fname))[0];
        if(Object.keys(col).indexOf('toValue') >= 0) {
          vobj[col.accessor] = col.toValue(x);
        } else {
          vobj[col.accessor] = x[fname];
	}
      }
    }
    return vobj;
  };
  populateData(xhr, pe) {
    if(xhr.readyState === 4) {
      if(xhr.status === 200) {
        var dataset_list = JSON.parse(xhr.responseText);

	this.setState({
		'dataset': dataset_list.objects.map(this.fieldToValue.bind(null, collection_tables[this.props.collection])),
		'pages': Math.ceil(dataset_list.meta.total_count / this.state.table_size),
		'loading': false,
	});
      };
    };
  };
  failData(xhr, pe) {
    console.error("Failed to get data! " + xhr.statusText);
  };
  columnToField(y) {
    if(y.id === "source") {
      return {'id': 'source.name', 'desc': y.desc};
    }
    return y;
  }
  fetchData(state, inst) {
    var xhr = new XMLHttpRequest();
    var query_uri = crits_uri + "api/v1/" + this.props.collection + "/?";

    // Limit results by page size
    query_uri = query_uri + "limit=" + state.pageSize.toString();

    // Set offset to be first item on current page
    query_uri = query_uri + "&offset=" + (state.pageSize * state.page).toString();

    if(state.sorted.length > 0) {
      query_uri = query_uri + "&sort=";
      query_uri = query_uri +
		    state.sorted.filter(this.columnToField
		                       ).map((x) => { return (x.desc ? '-' + x.id : x.id) }).join(',')
    }

    if(collection_tables[this.props.collection].fieldset.length > 0) {
      query_uri = query_uri + "&only=";
      query_uri = query_uri + collection_tables[this.props.collection].fieldset.join(',');
    }

    xhr.open("GET", query_uri, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.onload = this.populateData.bind(this, xhr);
    xhr.onerror = this.failData.bind(this, xhr);
    this.setState({table_size: state.pageSize});
    xhr.send(null);
  };
  render() {
    var columns = collection_tables[this.props.collection].columns;
    return (
      <ReactTable
	data={this.state.dataset}
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
   {
       /* Iterate across the data sets configured in collection_tables, and create
	* appropriate routes for them.
	*/
       Object.keys(collection_tables).map(function(coll) {
	       return (<Route key={coll} path={"/" + coll} component={() => (<CRITSDataView collection={coll} />)} />);
       })
   }
  </div>
);

ReactDOM.render(
  <BrowserRouter>
   <CRITSApp />
  </BrowserRouter>,
  document.getElementById('root')
);
