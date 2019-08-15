# Docker file for a slim Ubuntu-based Python3 image

FROM ubuntu:latest

RUN apt-get update \
  && apt-get install -y curl python3-pip python3-dev \
  && cd /usr/local/bin \
  && ln -s /usr/bin/python3 python \
  && pip3 install --upgrade pip

RUN pip3 install asyncio
RUN pip3 install websockets
RUN pip3 install flask

# no need to use cython for `python setup.py install` 
# RUN pip install cython

RUN cd /home && \
    curl -L https://github.com/ADLINK-IST/opensplice/releases/download/OSPL_V6_9_181018OSS_RELEASE/PXXX-VortexOpenSplice-6.9.181018OSS-HDE-x86_64.linux-gcc5.4.0-glibc2.23-installer.tar.gz \
    | tar xz

# copy locally (extracted)
# ADD PXXX-VortexOpenSplice-6.9.181018OSS-HDE-x86_64.linux-gcc5.4.0-glibc2.23-installer.tar.gz /home

# Setting environment variables
ENV OSPL_HOME /home/HDE/x86_64.linux
ENV PATH $OSPL_HOME/bin:$PATH
ENV LD_LIBRARY_PATH $OSPL_HOME/lib${LD_LIBRARY_PATH:+:}$LD_LIBRARY_PATH
ENV CPATH $OSPL_HOME/include:$OSPL_HOME/include/sys:${CPATH}
ENV OSPL_URI file://$OSPL_HOME/etc/config/ospl.xml

# RUN pip install $OSPL_HOME/tools/python/dds-6.9.181018OSS-cp35-cp35m-linux_x86_64.whl

EXPOSE 5000
EXPOSE 8765

COPY ./gateway /home/sdv/gateway
WORKDIR /home/sdv/gateway

CMD ["python3", "gateway.py"]