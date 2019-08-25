function easyHTTP() {
    this.http = new XMLHttpRequest();
}

// Make an HTTP GET request
easyHTTP.prototype.get = function(url, callback) {
    this.http.open("GET", url, true);

    this.http.onload = function() {
        if (this.http.status === 200) {
            callback(null, this.http.responseText);
        } else {
            callback("Error: " + this.http.status);
        }
    }.bind(this);

    this.http.send();
};

// Make an HTTP POST request
easyHTTP.prototype.post = function(url, data, callback) {
    this.http.open("POST", url, true);
    this.http.setRequestHeader("Content-type", "application/json");

    this.http.onload = function() {
        callback(null, this.http.responseText);
    }.bind(this);

    this.http.send(JSON.stringify(data));
};

// Make an HTTP PUT request
easyHTTP.prototype.put = function(url, data, callback) {
    this.http.open("PUT", url, true);
    this.http.setRequestHeader("Content-type", "application/json");

    this.http.onload = function() {
        callback(null, this.http.responseText);
    }.bind(this);

    this.http.send(JSON.stringify(data));
};

// Make an HTTP DELETE request
easyHTTP.prototype.delete = function(url, callback) {
    this.http.open("DELETE", url, true);

    this.http.onload = function() {
        if (this.http.status === 200) {
            callback(null, "Post deleted");
        } else {
            callback("Error: " + this.http.responseText);
        }
    }.bind(this);

    this.http.send();
};
