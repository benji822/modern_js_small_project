const http = new easyHTTP();

// http.get("https://jsonplaceholder.typicode.com/posts", function(err, res) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(res);
//     }
// });

const data = {
    title: "Custom post",
    body: "From custom post"
};

// http.post("https://jsonplaceholder.typicode.com/posts", data, function(
//     err,
//     post
// ) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

http.put("https://jsonplaceholder.typicode.com/posts/1", data, function(
    err,
    post
) {
    if (err) {
        console.log(err);
    } else {
        console.log(post);
    }
});

http.delete("https://jsonplaceholder.typicode.com/posts/1", function(
    err,
    post
) {
    if (err) {
        console.log(err);
    } else {
        console.log(post);
    }
});
