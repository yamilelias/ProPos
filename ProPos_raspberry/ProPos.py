#!/usr/local/Cellar/python/2.7.11/bin

from facerec.feature import Fisherfaces
from facerec.classifier import NearestNeighbor
from facerec.model import PredictableModel
from PIL import Image
import numpy as np
from PIL import Image
import sys, os
import time
# sys.path.append("../..")
import cv2
import multiprocessing
import requests


class ProPos:
    face_cascade = cv2.CascadeClassifier('haarcascades/haarcascade_frontalface_default.xml')
    model = PredictableModel(Fisherfaces(), NearestNeighbor())
    cap = cv2.VideoCapture(0)
    camera_id = 1
    url = 'http://localhost:8080/'
    last_face = ''

    recognizer = cv2.createLBPHFaceRecognizer()
    path = 'img_db/'

    def __init__(self):
        print 'Working'

    def read_images(self, path, size=(256, 256)):
        c = 0
        x, y = [], []
        folder_names = []

        for dirname, dirnames, filenames in os.walk(path):
            for subdirname in dirnames:
                folder_names.append(subdirname)
                subject_path = os.path.join(dirname, subdirname)
                for filename in os.listdir(subject_path):
                    try:
                        im = cv2.imread(os.path.join(subject_path, filename), cv2.IMREAD_GRAYSCALE)

                        # resize to given size (if given)
                        if (size is not None):
                            im = cv2.resize(im, size)
                        x.append(np.asarray(im, dtype=np.uint8))
                        y.append(c)
                    except IOError, (errno, strerror):
                        print "I/O error({0}): {1}".format(errno, strerror)
                    except:
                        print "Unexpected error:", sys.exc_info()[0]
                        raise
                c += 1
        return [x, y, folder_names]

    def learn_faces(self):
        amount = int(raw_input('Numero de personas: '))
        for i in range(amount):
            name = raw_input('Numero '+str(i+1)+' nombre: ')
            if not os.path.exists(self.path+name):os.makedirs(self.path+name)
            print 'Press \"s\" to start capturing \n'
            while True:
                _, frame = self.cap.read()

                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                faces = self.face_cascade.detectMultiScale(gray, 1.2, 3)
                for (x, y, w, h) in faces:
                    cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
                cv2.imshow('Recognition', frame)

                if cv2.waitKey(10) == ord('s'):
                    break
            cv2.destroyAllWindows()

            start = time.time()
            count = 0
            while int(time.time()-start) <= 8:

                _, frame = self.cap.read()
                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                faces = self.face_cascade.detectMultiScale(gray, 1.2, 3)
                for (x, y, w, h) in faces:
                    cv2.putText(frame, 'Snap!', (x, y), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 250), 3, 1)
                    count += 1
                    cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
                    resized_image = cv2.resize(frame[y:y+h, x:x+w], (273, 273))
                    if count%5 == 0:
                        print self.path+name+str(time.time()-start)+'.jpg'
                        cv2.imwrite(self.path+name+'/'+str(time.time()-start)+'.jpg', resized_image)
                cv2.imshow('Recognition', frame)
                cv2.waitKey(10)
            cv2.destroyAllWindows()

    def capture_img(self):
        [x, y, subject_names] = self.read_images(self.path)
        list_l = list(xrange(max(y) + 1))
        subject_dictionary = dict(zip(list_l, subject_names))
        self.model.compute(x, y)
        while True:
            _, frame = self.cap.read()
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = self.face_cascade.detectMultiScale(gray, 1.2, 3)
            for (x, y, w, h) in faces:
                sample_image = gray[y:y + h, x:x + w]
                sample_image = cv2.resize(sample_image, (256, 256))
                [predicted_label, generic_classifier_output] = self.model.predict(sample_image)
                if int(generic_classifier_output['distances']) <= 700:
                    print 'Found: ' + str(subject_dictionary[predicted_label])
            if cv2.waitKey(10) == 27:
                break

    def post_result(self, name=None):
        data = name + '/' + self.camera_id
        requests.post(self.url + 'faceName/', data)

    def main(self):
        self.capture_img()
        # self.learn_faces()

ProPos().main()
