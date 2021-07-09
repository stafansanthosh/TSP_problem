from flask import Flask, render_template, url_for
app = Flask(__name__)

posts = [
    {
        'author': 'Pranav',
        'title': 'Blog post 1'
    },
        {
        'author': 'Jane',
        'title': 'Blog post 2'
    }
     
]


@app.route("/")
@app.route("/home")
def home():
    return render_template('index.html', posts = posts)

@app.route("/ga")
def GA():
    return render_template('ga_sketch.html', posts = posts)

@app.route("/about")
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)