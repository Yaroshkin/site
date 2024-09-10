import sqlite3
from telebot import TeleBot
from flask import Flask, render_template, request, jsonify,redirect,url_for, session
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from flask_admin.contrib.fileadmin import FileAdmin
from flask_admin.form import FileUploadField
from flask_admin.form import FileUploadField
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'admin'  # Замените на секретный ключ
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # Используем SQLite
app.config['UPLOAD_FOLDER'] = 'uploads'

db = SQLAlchemy(app)
ADMIN_USERNAME = 'aspor'
ADMIN_PASSWORD = 'qazwsx123'


def send_message_to_telegram(name, phone, email, message):
    # Подключаемся к базе данных
    conn = sqlite3.connect('instance/app.db')  # Подставьте путь к вашей базе данных
    cursor = conn.cursor()

    # Выполняем запрос к базе данных
    cursor.execute("SELECT * FROM tg__bot")  # Замените на имя вашей таблицы

    # Получаем первую строку из результата запроса
    bot_data = cursor.fetchone()
    conn.close()
    bot_token = bot_data[1]
    bot = TeleBot(bot_token)
    chat_id = bot_data[2]
    text = f'✨ НОВИЙ ЗАПИТ ✨\n\n' \
           f'🔸 Категорія товару:  {name}\n' \
           f'🔹 Вага і об`єм:  {message}\n' \
           f'📧 Email:  {email}\n' \
           f'📞 Телефон:  {phone}'

    bot.send_message(chat_id, text)


@app.route('/')
def home():
    # Подключаемся к базе данных
    conn = sqlite3.connect('instance/app.db')
    cursor = conn.cursor()

    # Выполняем запрос к базе данных
    cursor.execute("SELECT * FROM you_tube")  # Замените на имя вашей таблицы

    # Получаем все строки из результата запроса
    rows = cursor.fetchall()

    # Закрываем соединение с базой данных
    conn.close()
    # Подключаемся к базе данных
    conn = sqlite3.connect('instance/app.db')
    cursor = conn.cursor()

    # Выполняем запрос к базе данных
    cursor.execute("SELECT * FROM tg__chan")  # Замените на имя вашей таблицы

    # Получаем все строки из результата запроса
    bot_link = cursor.fetchall()
    bot_link = bot_link[0]
    bot_link = bot_link[1]

    # Закрываем соединение с базой данных
    conn.close()
    return render_template('/ua/index.html', rows=(rows, bot_link))

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form.get('name')
    name = str(name)
    phone = request.form.get('phone')
    phone = str(phone)
    email = request.form.get('email')
    email = str(email)
    message = request.form.get('message')
    message = str(message)


    send_message_to_telegram(name, phone, email, message)

    return jsonify({'success': True})


def send_message_to_telegram1(name, phone):
    # Подключаемся к базе данных
    conn = sqlite3.connect('instance/app.db')  # Подставьте путь к вашей базе данных
    cursor = conn.cursor()

    # Выполняем запрос к базе данных
    cursor.execute("SELECT * FROM tg__bot")  # Замените на имя вашей таблицы

    # Получаем первую строку из результата запроса
    bot_data = cursor.fetchone()
    conn.close()
    bot_token = bot_data[1]
    bot = TeleBot(bot_token)
    chat_id = bot_data[2]
    text = f'✨ Безкоштовна консультація ✨\n\n' \
           f'🔸 Імя:  {name}\n' \
           f'📞 Телефон:  {phone}'

    bot.send_message(chat_id, text)
    
    
def send_message_to_telegram2(name, phone, message):
    # Подключаемся к базе данных
    conn = sqlite3.connect('instance/app.db')  # Подставьте путь к вашей базе данных
    cursor = conn.cursor()

    # Выполняем запрос к базе данных
    cursor.execute("SELECT * FROM tg__bot")  # Замените на имя вашей таблицы

    # Получаем первую строку из результата запроса
    bot_data = cursor.fetchone()
    conn.close()
    bot_token = bot_data[1]
    bot = TeleBot(bot_token)
    chat_id = bot_data[2]
    text = f'✨ Питання ✨\n\n' \
           f'🔸 Імя:  {name}\n' \
           f'📞 Телефон:  {phone}\n'\
           f'Питання:{message}'

    bot.send_message(chat_id, text)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:  # Replace with your admin credentials
            session['logged_in'] = True
            return redirect('/admin')
        else:
            error = 'Invalid credentials. Please try again.'
            return render_template('/home/login.html', error=error)
    return render_template('/home/login.html')

class MyAdminIndexView(AdminIndexView):
    def is_accessible(self):
        return session.get('logged_in')

    def inaccessible_callback(self, name, **kwargs):
        return redirect('/login')


@app.route('/contact1', methods=['POST'])
def contact1():
    name = request.form.get('name')
    name = str(name)
    phone = request.form.get('phone')
    phone = str(phone)
    print(name,phone)



    send_message_to_telegram1(name, phone)

    return jsonify({'success': True})


@app.route('/telme', methods=['POST'])
def telme():
    name = request.form.get('name')
    name = str(name)
    phone = request.form.get('phone')
    phone = str(phone)
    message = request.form.get('message')
    message = str(message)
    print(name,phone)



    send_message_to_telegram2(name, phone, message)

    return jsonify({'success': True})



@app.route('/ru/')
def index_ru():
    # Подключаемся к базе данных
    conn = sqlite3.connect('instance/app.db')
    cursor = conn.cursor()

    # Выполняем запрос к базе данных
    cursor.execute("SELECT * FROM you_tube")  # Замените на имя вашей таблицы

    # Получаем все строки из результата запроса
    rows = cursor.fetchall()

    # Закрываем соединение с базой данных
    conn.close()
    # Подключаемся к базе данных
    conn = sqlite3.connect('instance/app.db')
    cursor = conn.cursor()

    # Выполняем запрос к базе данных
    cursor.execute("SELECT * FROM tg__chan")  # Замените на имя вашей таблицы

    # Получаем все строки из результата запроса
    bot_link = cursor.fetchall()
    bot_link = bot_link[0]
    bot_link = bot_link[1]

    # Закрываем соединение с базой данных
    conn.close()
    return render_template('/ru/indexru.html', rows=(rows, bot_link))

@app.route('/ru/our')
def ourru():
    return render_template('/ru/ourru.html')

@app.route('/ru/contacts')
def contru():
    return render_template('/ru/contactru.html')

@app.route('/ru/about')
def aboutru():
    return render_template('/ru/aboutru.html')

@app.route('/ru/impos')
def imposru():
    # Подключаемся к базе данных
    conn = sqlite3.connect('instance/app.db')
    cursor = conn.cursor()

    # Выполняем запрос к базе данных
    cursor.execute("SELECT * FROM news")  # Замените на имя вашей таблицы

    # Получаем все строки из результата запроса
    rows = cursor.fetchall()

    # Закрываем соединение с базой данных
    conn.close()

    # Передаем данные в шаблон и рендерим страницу
    return render_template('/ru/imposru.html', rows=rows)




@app.route('/our')
def our():
    return render_template('/ua/our.html')

@app.route('/contacts')
def cont():
    return render_template('/ua/contact.html')

@app.route('/about')
def about():
    return render_template('/ua/about.html')

@app.route('/impos')
def impos():
    # Подключаемся к базе данных
    conn = sqlite3.connect('instance/app.db')
    cursor = conn.cursor()

    # Выполняем запрос к базе данных
    cursor.execute("SELECT * FROM news")  # Замените на имя вашей таблицы

    # Получаем все строки из результата запроса
    rows = cursor.fetchall()

    # Закрываем соединение с базой данных
    conn.close()

    # Передаем данные в шаблон и рендерим страницу
    return render_template('/ua/impos.html', rows=rows)

# Определение модели Product
class YouTube(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    link = db.Column(db.Text)

class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    photo = db.Column(db.String(100))  # Имя файла фотографии

class NewsModelView(ModelView):
    form_overrides = {
        'photo': FileUploadField
    }

    form_args = {
        'photo': {
            'label': 'Фотография',
            'base_path': os.path.join(os.path.dirname(__file__), 'static/uploads'),
            'allow_overwrite': False  # Разрешить перезапись файлов
        }
    }

@app.route('/impos/<int:news_id>')
def news_page(news_id):
    news = News.query.get(news_id)
    return render_template('news_page.html', news=news)

@app.route('/ru/impos/<int:news_id>')
def news_pageru(news_id):
    news = News.query.get(news_id)
    return render_template('news_pageru.html', news=news)

class TG_Bot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bot_api = db.Column(db.String(100), nullable=False)
    chat_id = db.Column(db.Text)

class TG_Chan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    link = db.Column(db.String(100), nullable=False)

admin = Admin(app, name='ASPOR Admin', template_mode='bootstrap3', index_view=MyAdminIndexView())
admin.add_view(ModelView(YouTube, db.session))
admin.add_view(NewsModelView(News, db.session))
admin.add_view(NewsModelView(TG_Bot, db.session))
admin.add_view(NewsModelView(TG_Chan, db.session))

# Создание всех таблиц базы данных, включая модель Product
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
    bot.remove_webhook()
    bot.polling()



